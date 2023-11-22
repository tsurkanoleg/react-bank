import "./index.css";

// SignUpPage.js
import React, { useState } from 'react';
import SignUpForm from '../../container/SignUpForm';

import BackButton from "../back-button";

const SignUpPage = () => {
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
			const userExists = checkIfUserExists(username);
	
			if (userExists) {
				setUserExistsMessage('User with this username already exists. Please choose another one.');
			} else {
				// Очищаємо повідомлення, якщо користувач не існує
				setUserExistsMessage('');
	
				try {
					// Відправка запиту на сторінку signup-confirm
					const response = await fetch('http://localhost:4000/signup', {
						method: 'POST', 
						headers: {
							'Content-Type': 'application/json',
						},
						// Тут можна передати необхідні дані на сервер, наприклад, ім'я користувача
						body: JSON.stringify({ username }),
					});
	
					if (response.ok) {
						// Обробка успішної відповіді від сервера (якщо потрібно)
						console.log('Signup confirm request successful');
					} else {
						// Обробка помилки від сервера
						console.error('Failed to send signup confirm request');
					}
				} catch (error) {
					// Обробка помилок, які можуть виникнути при виконанні запиту
					console.error('Error during signup confirm request:', error);
				}
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
      <div className="signUp__top">
				<BackButton/>

				<div className="signUp__bord">
					<h2 className='signUp__title'>Sign Up</h2>
					<p className='signUp__description'>Choose a registration method</p>
				</div>

				{/* Відображення повідомлення про існування користувача */}
			</div>
      {userExistsMessage && <p style={{ color: 'red' }}>{userExistsMessage}</p>}
      
      {/* Форма реєстрації */}
      <SignUpForm onUsernameChange={handleUsernameChange} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default SignUpPage;
















