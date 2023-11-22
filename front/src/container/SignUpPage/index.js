import "./index.css";

// SignUpPage.js
import React, { useState } from 'react';
import SignUpForm from '../../container/SignUpForm';

const SignUpPage = () => {
  // Стан для збереження імені користувача та повідомлення про існування
  const [username, setUsername] = useState('');
  const [userExistsMessage, setUserExistsMessage] = useState('');

  // Обробник події введення імені користувача
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Обробник події підтвердження форми (може бути в SignUpForm)
  const handleFormSubmit = () => {
    // Тут ви повинні виконати перевірку імені користувача та встановити повідомлення про існування
    // Наприклад, можна використовувати вашу логіку перевірки наявності користувача в базі даних

    // Приклад: перевіряємо, чи існує користувач з таким іменем
    const userExists = checkIfUserExists(username);

    if (userExists) {
      setUserExistsMessage('User with this username already exists. Please choose another one.');
    } else {
      setUserExistsMessage(''); // Очищаємо повідомлення, якщо користувач не існує
      // Тут ви можете виконати інші дії, наприклад, відправити дані форми на сервер або викликати інші функції
    }
  };

  // Ваша функція, яка перевіряє наявність користувача в базі даних
  const checkIfUserExists = (username) => {
    // Ваш код перевірки

    // Приклад: тут може бути запит до сервера або інша логіка перевірки імені користувача
    // Замініть це на вашу реальну логіку
    return false; // Припустимо, що користувач не існує
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



















// // SignUpPage.js
// import React from 'react';
// import SignUpForm from '../SignUpForm';

// const SignUpPage = () => {
//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <SignUpForm />
//     </div>
//   );
// };

// export default SignUpPage;
