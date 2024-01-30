// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { Notification } = require('../class/notification')
const { Bank } = require('../class/bank')

User.create({
  email: 'user@mail.com',
  password: '123qweQWE',
})



// ================================================================

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  // console.log(req.body,':path = back/route/auth.js,50 OK')

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
		// console.log('Email:', email, 'password:', password ,':path = back/route/auth.js,59');
		
    const user = User.getByEmail(email)


    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      })
    }
		
		const newUser = User.create({ email, password})
		// console.log(newUser, '71')

		const session = Session.create(newUser)
		
		console.log(session, '75')  

		
		const token = Confirm.create({ email: newUser.email })		
		// console.log(token, '79')     


		const userAccountBank = Bank.getAccountByUser(user);
		if (!userAccountBank) {
      Bank.create(user);
      console.log('Create new bank account');
    }

		let userNotification = Notification.getNotificationByUser(email);
			
		if (!userNotification) {
			userNotification = Notification.create(email);				
		}
		console.log(userNotification, 'Create new account notification');	

		const newNotification = userNotification.addNotification('Ви зареєструвалися', 'login')
		console.log(newNotification, 'New notification');		

    return res.status(200).json({
      message: 'Користувач успішно зареєстрованний',
      session,
			token,
			userAccountBank,
			newNotification,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// ===========================================================

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body	

	const numericCode = parseInt(code, 10);

	if (!isNaN(numericCode)) {
		// `numericCode` тепер є числовим значенням
		// console.log(numericCode, ':path = back/route/auth.js,135');
	} else {
		console.log(req.body, 'Помилка при перетворенні `code` у число');
	}
			
	// console.log(token, numericCode, ':path = back/route/auth.js,130');

	if (!numericCode || !token) {		
		return res.status(400).json({
			message: "Помилка. Обов'язкові поля відсутні",
		})
	}

  try {	
		if(!numericCode) {
			return res.status(400).json({
				message: 'Код не існує(:path = back/route/auth.js,141)',
			})
		}	else {
			// console.log(numericCode, 'path = back/route/auth.js,144')
		}

    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Помилка. Ви не увійшли в аккаунт',
      })
    } else {
			// console.log(session, ':path = back/route/auth.js,154')
		}

    const email = Confirm.getData(numericCode);

		if(!email) {
			console.log(email, ':path = back/route/auth.js,160')
			return res.status(400).json({
        message: 'Код не існує:path = back/route/auth.js,162)',
      })
		} else {
			// console.log(email, ':path = back/route/auth.js,165')
		}
		
		// console.log(email.email, ':path = back/route/auth.js,178')
		// console.log(session.user.email, ':path = back/route/auth.js,179')

    if (email.email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний :path = back/route/auth.js,183'
				
      })
    }
	
		const user = User.getByEmail(session.user.email)

		// console.log(session.user, ':path = back/route/auth.js,190')

		user.isConfirm = true
		session.user.isConfirm = true

		// console.log(session.user, ':path = back/route/auth.js,195')

		return res.status(200).json({
			message: 'Ви підтвердили свою пошту',
			session,
		
		})	
    
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})


// ================================================================

router.post('/recovery', function (req, res) {
  const { email } = req.body

  console.log(email, ':path = back/route/auth.js,199')

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні123",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ================================================================

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  console.log(password, code,':path = back/route/auth.js,253')

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Код не існує(recovery)',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    user.password = password
		user.isConfirm = true

    console.log(user,':path = back/route/auth.js,280')

    const session = Session.create(user)

		console.log(session, 'session===')

    return res.status(200).json({
      message: 'Пароль змінено',
      session,
			redirectUrl: '/balance'
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ================================================================

router.post('/signin', function (req, res) {
  const { email, password, session } = req.body
	console.log(email, password, session)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

	const user = User.getByEmail(String(email))
	console.log(user, 'user==============')

  try {

		if (!user) {
			return res.status(400).json({
				message:
					'Помилка. Користувач з таким email не існує',
			})
		}
	
		if (user.password !== password) {
			return res.status(400).json({
				message: 'Помилка. Пароль не підходить',
			})
		}

	

		
		if(!session) {
			const session = Session.create(user)

			const code = Confirm.create({ email })	

			console.log( code, 'confirmCode============')	

			

			let userNotification = Notification.getNotificationByUser(email);
			
			if (!userNotification) {
				userNotification = Notification.create(email);	
				// console.log(userNotification, 'Create new account notification');				
			}
			

			const newNotification = userNotification.addNotification('Ви увійшли в систему','login')
			// console.log(newNotification, 'New notification');


				
			return res.status(200).json({
				message: 'Ви увійшли',
				session,
				code,
				newNotification,
			})
		} else if (session.user.isConfirm === true) {
			const session = Session.create(user)
							
			return res.status(200).json({
				message: 'Ви увійшли',
				session,
			})
		}	else if(session) {
			const session = Session.create(user)

			const code = Confirm.create({ email })	

			console.log( code, 'confirmCode============')	

			

			let userNotification = Notification.getNotificationByUser(email);
			
			if (!userNotification) {
				userNotification = Notification.create(email);	
				// console.log(userNotification, 'Create new account notification');				
			}
			

			const newNotification = userNotification.addNotification('Ви увійшли в систему','login')
			// console.log(newNotification, 'New notification');


				
			return res.status(200).json({
				message: 'Ви увійшли',
				session,
				code,
				newNotification,
			})
		}
		
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
