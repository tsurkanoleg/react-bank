// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()



const { User } = require('../class/user')
const {Session} = require('../class/session')
const { Bank } = require('../class/bank')
const { Notification } = require('../class/notification') 

User.create({
  email: 'user@mail.com',
  password: '123qweQWE',
})




// ================================================================

router.post('/user-list-data', function (req, res) {
  const list = User.getList()

  // console.log(list,':path = back/route/user.js,48')  

  if (list.length === 0) {
    return res.status(400).json({
      message: 'Список користувачів порожній',
    })
  }

  return res.status(200).json({
    list: list.map(({ id, email }) => ({
      id,
      email,
    })),
  })
})

// ================================================================

router.post('/check-email', async (req, res) => {
  const { email } = await req.body;

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Ім'я користувача не вказано",
    });
  }

  try {
    const user = await User.getByEmail(email);

    if (user) {
      return res.status(200).json({
        exists: true,
        message: 'Користувач з таким іменем вже існує',
      });
    } else {
			return res.status(200).json({
				exists: false,
				message: "Ім'я користувача доступне для реєстрації",
				// redirectUrl: 'http://localhost:3000/signup-confirm', 
			});
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Помилка сервера при перевірці імені користувача',
    });
  }
});

// ============================================================

router.post('/balance', function (req, res) {
  const { session } = req.body;
	// console.log(req.body,'перший консоль Лог')

	const user = session.user.email;
	const userAccount = Bank.getAccountByUser(user);

	// console.log(user,userAccount)

  try {   

    if (!userAccount) {
      // Створення банківського рахунку для користувача
      Bank.create(user);
      console.log('Create new bank account');
    }

    // console.log('User Account:', userAccount);

		// Отримання поточного балансу
		let currentBalance = Number(userAccount.getBalance());
		// console.log('Current Balance:', currentBalance);

		// Отримання історії транзакцій
		const transactionHistory = userAccount.getTransactionHistory();
		// console.log('Transaction History:', transactionHistory);

		if (req.body.type === 'balance') {
			return res.status(200).json({
				currentBalance,
				transactionHistory,
			});
		}
		
    if (req.body.type === 'Receive') {
			const {paymentSystem, amountReceive } = req.body;			
			
      const newBalance = userAccount.receive(Number(amountReceive), paymentSystem);
			// console.log(newBalance, 'newBalance')

			currentBalance = newBalance
			// console.log(currentBalance, 'currentBalance')
			
      return res.status(200).json({
        paymentSystem,
        currentBalance,
				transactionHistory,
        redirectUrl: '/balance',
      });
    }

    if (req.body.type === 'Send') {
			const {amountSend, email} = req.body;	
			// console.log(amountSend, 'amountSend')

      const newBalance = userAccount.send(Number(amountSend), email);
			// console.log(newBalance, 'newBalance')

			currentBalance = newBalance

      return res.status(200).json({
        currentBalance,
				transactionHistory,
        redirectUrl: '/balance',
      });
    }

		currentBalance = newBalance

    
  } catch (err) {
    return res.status(500).json({
      message: 'Помилка сервера при перевірці балансу користувача',
    });
  }
});

// ============================================================

router.post('/transaction/:transactionId', function (req, res) {
  
  const { session, transactionId } = req.body;
	// console.log(transactionId,'==============================================')
	
	const user = session.user.email;
	const bankAccount = Bank.getAccountByUser(user);
	// console.log(bankAccount, 'bankAccount')

	const id = Number(transactionId)


	// if (bankAccount) {
	// 	const transactionHistory = bankAccount.getTransactionHistory();
		
	// 	console.log('Transaction History:', transactionHistory);
	// } else {
	// 	console.error('Account not found for the user.');
	// }

  try {
    // Отримання транзакції за ідентифікатором
    const transaction = bankAccount.getTransactionById(id);
		// console.log('===============')
		// console.log(transaction)
		// console.log('===============')

    if (transaction) {
      return res.status(200).json({ 
				transaction,
				redirectUrl: '/transaction/:transactionId',
			 });
    } else {
      return res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ============================================================

router.post('/settings/email', function (req, res) {
	const { newEmail, password, session } = req.body
	// console.log(newEmail, password, session, 'path:back/route/user.103' )
	
	if (!newEmail || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

	const email = session.user.email
	const user = User.getByEmail(email)		
	
	// console.log( user, 'user========')		

	if (!user) {
		return res.status(400).json({
			message: 'Користувач з таким email не існує',
		})
	}

	// user.isConfirm = true

	if (user.email !== session.user.email) {
		return res.status(300).json({
			message: 'користувач сесії не співпадає з користувачем реєстрації'
		})
	}

	if (user.password !== password) {
		return res.status(300).json({
			message:'Пароль не вірний'
		})			
	}			
		
	try{
		user.email = newEmail
		
		const newSession = Session.create(user)			

		const account = Bank.getAccountByUser(email)
		// console.log(account, ':::::account')

		const newAccountBank = account.updateEmail(newEmail)	
		// console.log(newAccountBank, ':::::newAccountBank')	


		
		let userNotification = Notification.getNotificationByUser(email);
		console.log(userNotification, ':::::userNotification')	

		if (!userNotification) {
			userNotification = Notification.create(newEmail);	
			console.log(userNotification, 'Create new account notification');				
		}		

		const newAccountNotification = userNotification.updateEmail(newEmail)
		console.log(newAccountNotification, ':::::newAccountNotification')	
			
	
		

		const newNotification = userNotification.addNotification('Ви змінили пошту', 'email')
		// console.log(newNotification, 'New notification');		


		return res.status(200).json({
			message: 'Email змінено',
			newSession,		
			redirectUrl: '/balance',
			newAccountBank,
			newNotification,
		})		
	
	} catch (err) {
		return res.status(500).json({
			message: 'Помилка сервера при зміні імені користувача',
		});
	}

})

// ============================================================
router.post('/settings/password', async function (req, res) {
	const { oldPassword, newPassword, email } = req.body
	// console.log(oldPassword, newPassword, email, 'path:back/route/user.179' )

	if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

	const user = User.getByEmail(email)
	// console.log( email, 'email============189' , user, 'user===========189')

	if (!user) {
		return res.status(400).json({
			message: 'Користувач з таким email не існує',
		})
	}

	// console.log(user.password, oldPassword,'=====================197')
	if (user.password !== oldPassword) {
		return res.status(300).json({
			message:'Пароль не зходиться'
		})			
	}


	try {	
		user.password = newPassword

		const newSession = Session.create(user)	
		
		// console.log(newSession, 'session', user, 'newUser')

		
		let userNotification = Notification.getNotificationByUser(email);
			
		if (!userNotification) {
			userNotification = Notification.create(email);				
		}
		console.log(userNotification, 'Create new account notification');	

		const newNotification = userNotification.addNotification('Ви змінили пароль', 'password')
		console.log(newNotification, 'New notification');		

		return res.status(200).json({
			message: 'Пароль змінено',
			newSession,	
			redirectUrl: '/balance',
			newNotification,
		})		
	
	} catch (err) {
		return res.status(500).json({
			message: 'Помилка сервера при зміні паролю користувача',
		});
	}

})

// ============================================================

router.post('/notifications', function (req, res) {
	const {user} = req.body
	try {
		const userNotification = Notification.getNotificationByUser(user)
		
		if (!userNotification) {
			Notification.create(user);
			console.log('Create new accountNotification');
		}		

		// userNotification.addNotification('test', 'qwer')

		const list = userNotification.getNotificationHistory()
		
		// console.log(list, 'Список нотифікацій path:back/route/user.385')

		return res.status(200).json({
			list,
		});	
	} catch (err) {
    return res.status(500).json({
      message: 'Помилка сервера при перевірці історії нотифікацій користувача',
    });	
	}

})

// Підключаємо роутер до бек-енду
module.exports = router
