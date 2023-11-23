import "./index.css";





// import React, { useState } from 'react';
// import SignUpForm from '../../container/SignUpForm';
// import { useAuth } from '../../component/AuthContextProvider';
// import { Link } from 'react-router-dom'; // Додаємо імпорт

// const SignUpPage = () => {
//   const dispatch = useAuth();

//   const [username, setUsername] = useState('');
//   const [userExistsMessage, setUserExistsMessage] = useState('');

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleFormSubmit = async () => {
//     const userExists = await checkIfUserExists(username);

//     if (userExists) {
//       setUserExistsMessage('Користувач із таким іменем вже існує. Виберіть інше');
//     } else {
//       setUserExistsMessage('');

//       try {
//         const response = await fetch('http://localhost:4000/signup-confirm', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email: username, password: 'yourPassword' }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           dispatch({ type: 'LOGIN', payload: { token: data.token, user: data.user } });
//           // Замінюємо history.push на використання Link
//           // history.push('/signup-confirm');
//         } else {
//           console.log('Помилка реєстрації');
//           const errorData = await response.json();
//           console.error('Помилка реєстрації. Серверна помилка:', errorData);
//         }
//       } catch (error) {
//         console.error('Помилка під час реєстрації:', error);
//       }
//     }
//   };

//   const checkIfUserExists = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:4000/checkuser?username=${username}`);
//       const data = await response.json();
//       return data.exists;
//     } catch (error) {
//       console.error('Помилка під час перевірки користувача:', error);
//       return false;
//     }
//   };

//   return (
//     <div className='signUp__page'>
//       <h2 className='signUp__title'>Sign Up</h2>
//       <h5 className='signUp__description'>Select login method</h5>
//       {userExistsMessage && <p style={{ color: 'red' }}>{userExistsMessage}</p>}
//       {/* Використовуємо Link для переходу на іншу сторінку */}
//       <Link to="/signup-confirm">Go to SignUp Confirm</Link>
//       <SignUpForm onUsernameChange={handleUsernameChange} onSubmit={handleFormSubmit} />
//     </div>
//   );
// };
























































// SignUpPage.js
import React, { useState } from 'react';
import SignUpForm from '../../container/SignUpForm';
import { useAuth } from '../../component/AuthContextProvider';

const SignUpPage = ({ history }) => {
	const dispatch = useAuth();

  // Стан для збереження імені користувача та повідомлення про існування
  const [username, setUsername] = useState('');
  const [userExistsMessage, setUserExistsMessage] = useState('');

  // Обробник події введення імені користувача
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Обробник події підтвердження форми (може бути в SignUpForm)
  const handleFormSubmit = async () => {
    // Тут ви повинні виконати перевірку імені користувача та встановити повідомлення про існування
    // Наприклад, можна використовувати вашу логіку перевірки наявності користувача в базі даних

    // Приклад: перевіряємо, чи існує користувач з таким іменем
    const userExists = await checkIfUserExists(username);

    if (userExists) {
      setUserExistsMessage('Користувач із таким іменем вже існує. Виберіть інше');
    } else {
      setUserExistsMessage(''); // Очищаємо повідомлення, якщо користувач не існує
      // Тут ви можете виконати інші дії, наприклад, відправити дані форми на сервер або викликати інші функції
    }

		try {
			const response = await fetch('http://localhost:4000/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: username, password: 'yourPassword' }), // Додайте поле паролю
			});

			if (response.ok) {
				const data = await response.json();
				dispatch({ type: 'LOGIN', payload: { token: data.token, user: data.user } });
				history.push('/signup-confirm');
			} else {
				console.log('Помилка реєстрації');
				const errorData = await response.json();
				console.error('Помилка реєстрації. Серверна помилка:', errorData);
			}
		} catch (error) {
			console.error('Помилка під час реєстрації:', error);
		}	
	
  };

  // Ваша функція, яка перевіряє наявність користувача в базі даних
  const checkIfUserExists = async (username) => {
    // Ваш код перевірки
    
		try {
      const response = await fetch(`http://localhost:4000/checkuser?username=${username}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Помилка під час перевірки користувача:', error);
      return false;
    }
  };

  return (
    <div className='signUp__page'>
      <h2 className='signUp__title'>Sign Up</h2>
			<h5 className='signUp__description'>Select login method</h5>
      {/* Відображення повідомлення про існування користувача */}
      {userExistsMessage && <p style={{ color: 'red' }}>{userExistsMessage}</p>}
      
      {/* Форма реєстрації */}
      <SignUpForm onUsernameChange={handleUsernameChange} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default SignUpPage;
















