import BackButton from "../back-button";
import "./index.css";



// RecoveryPage.js
import React, { Component } from 'react';

class RecoveryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      disabled: false,
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, disabled } = this.state;

    const validateAll = (FIELD_NAME) => {
      Object.values(FIELD_NAME).forEach((name) => {
        const error = this.validate(name, this.value[name]);

        if (error) {
          this.setError(name, error);
        }
      });
    };

    if (disabled === true) {
      validateAll(this.FIELD_NAME);
    } else {
      this.setAlert('progress', 'Завантаження...');

      try {
        const res = await fetch('http://localhost:4000/recovery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        });

        const data = await res.json();

        if (res.ok) {
          this.setAlert('success', data.message);
          window.location.assign('http://localhost:3000/recovery-confirm');
        } else {
          this.setAlert('error', data.message);
        }
      } catch (error) {
        this.setAlert('error', error.message);
      }
    }

    console.log('Recovery email submitted:', email);
  };

  setAlert(type, message) {
    // Реалізуйте логіку відображення алерту
    console.log(`${type}: ${message}`);
  }

	 // Визначте метод convertData
	 convertData() {
    // Реалізуйте конвертацію даних, яку вам потрібно відправити
    return JSON.stringify({ email: this.state.email });
  }

  render() {
    const { email } = this.state;

    return (
      <div className="recovery__page">
        <div className="recovery__top">
          <BackButton />

          <div className="recovery__bord">
            <h2 className="recovery__title">Recover password</h2>
            <p className="recovery__description">Choose a recovery method</p>
          </div>
        </div>

        {/* Форма для відновлення акаунту */}
        <form onSubmit={this.handleSubmit}>
					
          <label className="recovery__email">
            <p className="recovery__text">Email:</p>
            {/* Поле вводу для електронної пошти */}
            <input
              className="recovery__layout recovery__input--email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>

          <br />
          {/* Кнопка відправки форми */}
          <button
            className="recovery__button recovery__button--text"
            type="submit"
            disabled={this.state.disabled}
          >
            Send code
          </button>
        </form>
      </div>
    );
  }
}

export default RecoveryPage;





















































// // RecoveryPage.js
// import React, { useState } from 'react';



// const RecoveryPage = () => {
//   // State для збереження даних форми
//   const [email, setEmail] = useState('');
// 	const [disabled, setDisabled] = useState(false); // ..................................

//   // Обробник зміни введених значень в формі
//   const handleChange = (e) => {
//     setEmail(e.target.value);
//   };



//   // Обробник відправки форми
//   const handleSubmit = async (e) => {
// 		e.preventDefault(); // ............................


// 		// Функція для валідації всіх полів форми
// 		const validateAll = () => {
// 			Object.values(FIELD_NAME).forEach((name) => {
// 				 // Виклик функції validate для кожного поля форми
// 				const error = validate(name, value[name])
	
// 				if (error) {
// 					// Встановлення помилки для поля форми
// 					this.setError(name, error)
// 				}
// 			});
// 		};

// 		// Перевірка, чи кнопка відключена


   

// 		if (disabled === true) {
// 			// Виклик функції валідації, якщо кнопка відключена
//       validateAll()
//     } else {
// 			// Виклик функції встановлення алерту для процесу завантаження
//       setAlert('progress', 'Завантаження...')

//       try {
// 				 // Відправка POST-запиту на сервер для відновлення пароля
//         const res = await fetch('http://localhost:4000/recovery', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: convertData(),
//         });

// 				// Отримання даних з відповіді сервера
//         const data = await res.json()

// 				// Перевірка, чи запит успішний
//         if (res.ok) {
// 					 // Виклик функції встановлення алерту для успішного завершення
//           setAlert('success', data.message)

// 					// Перенаправлення на сторінку підтвердження відновлення
//           window.location.assign('http://localhost:4000/recovery-confirm')
//         } else {
// 					// Виклик функції встановлення алерту для помилки
//           setAlert('error', data.message)
//         }
//       } catch (error) {
// 				// Виклик функції встановлення алерту для помилки
//         this.setAlert('error', error.message)
//       }
//     }

// 		// Виведення інформації про відновлення електронної пошти

//     console.log('Recovery email submitted:', email);
//   };

//   return (
//     <div className='recovery__page'>
// 			<div className="recovery__top">
// 				<BackButton/>
				
// 				<div className="recovery__bord">
// 					<h2 className='recovery__title'>Recover password</h2>
// 					<p className='recovery__description'>Choose a recovery method</p>
// 				</div>
// 			</div>

//       {/* Форма для відновлення акаунту */}
//       <form onSubmit={handleSubmit}>
//         <label className="recovery__email">
//           <p className="recovery__text">Email:</p>
//           <input
// 						className="recovery__layout recovery__input--email" 
//             type="email"
//             value={email}
//             onChange={handleChange}
//           />
//         </label>


//         <br />
//         <button 
// 					className="recovery__button recovery__button--text"
// 					type="submit"
//           disabled={disabled}
// 				>
// 					Send code
// 				</button>
//       </form>
//     </div>
//   );
// };

// export default RecoveryPage;
