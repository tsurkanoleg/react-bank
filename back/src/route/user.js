// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'user@mail.com',
  password: '123qweQWE',
})

User.create({
  email: 'admin@mail.com',
  password: '123qweQWE',
})



// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('user-list', {
    // вказуємо назву контейнера
    name: 'user-list',
    // вказуємо назву компонентів
    component: ['back-button'],

    // вказуємо назву сторінки
    title: 'User list page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/user-list-data', function (req, res) {
  const list = User.getList()

  console.log(list,':path = back/route/user.js,48')  

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

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-item', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('user-item', {
    // вказуємо назву контейнера
    name: 'user-item',
    // вказуємо назву компонентів
    component: ['back-button'],

    // вказуємо назву сторінки
    title: 'User item page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.get('/user-item-data', function (req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      message: 'Потрібно передати ID користувача',
    })
  }

  const user = User.getById(Number(id))

  if (!user) {
    return res.status(400).json({
      message: 'Користувач з таким ID не існує',
    })
  }

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      isConfirm: user.isConfirm,
    },
  })
})





// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/check-email', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('check-email', {
    // вказуємо назву контейнера
    name: 'check-email',
    // вказуємо назву компонентів
    component: [],

    // вказуємо назву сторінки
    title: 'Check-email page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
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
				redirectUrl: 'http://localhost:3000/signup-confirm', 
			});
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Помилка сервера при перевірці імені користувача',
    });
  }
});





// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/balance', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('balance', {
    // вказуємо назву контейнера
    name: 'balance',
    // вказуємо назву компонентів
    component: [],

    // вказуємо назву сторінки
    title: 'Balance page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/balance', function (req, res) {
 
})

// ============================================================


// // router.get Створює нам один ентпоїнт

// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/notifications', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('notifications', {
//     // вказуємо назву контейнера
//     name: 'balance',
//     // notifications назву компонентів
//     component: [],

//     // вказуємо назву сторінки
//     title: 'Notifications page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/notifications', function (req, res) {
 
// })


// ============================================================


// // router.get Створює нам один ентпоїнт

// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/send', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('send', {
//     // вказуємо назву контейнера
//     name: 'send',
//     // вказуємо назву компонентів
//     component: [],

//     // вказуємо назву сторінки
//     title: 'Send page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/send', function (req, res) {
 
// })


// ============================================================


// // router.get Створює нам один ентпоїнт

// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/settings', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('settings', {
//     // вказуємо назву контейнера
//     name: 'settings',
//     // вказуємо назву компонентів
//     component: [],

//     // вказуємо назву сторінки
//     title: 'Settings page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/settings', function (req, res) {
 
// })


// ============================================================


// // router.get Створює нам один ентпоїнт

// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/receive', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('receive', {
//     // вказуємо назву контейнера
//     name: 'receive',
//     // вказуємо назву компонентів
//     component: [],

//     // вказуємо назву сторінки
//     title: 'Receive page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/receive', function (req, res) {
 
// })


// ============================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/transaction', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('transaction', {
//     // вказуємо назву контейнера
//     name: 'transaction',
//     // вказуємо назву компонентів
//     component: [],

//     // вказуємо назву сторінки
//     title: 'Transaction page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/transaction', function (req, res) {
 
// })


// Підключаємо роутер до бек-енду
module.exports = router
