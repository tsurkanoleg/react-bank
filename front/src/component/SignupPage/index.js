// SignupPage

import "./index.css";

import React, { useState } from 'react';
import BackButton from "../back-button";
import { useAuth } from '../../component/AuthContextProvider';
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession } from "../../script/session";

 
const SignUpPage = ({ history }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userExistsMessage, setUserExistsMessage] = useState('');
  const { dispatch } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!REG_EXP_EMAIL.test(email)) {
      setUserExistsMessage('Недійсний формат електронної пошти. Будь ласка, введіть дійсну адресу електронної пошти.');
      return;
    }

    if (!REG_EXP_PASSWORD.test(password)) {
      setUserExistsMessage('Пароль має містити не менше 8 символів, включаючи літери та цифри.');
      return;
    }

    const response = await fetch('http://localhost:4000/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.exists) {
        setUserExistsMessage('Користувач з таким іменем вже існує');
      } else {
        setUserExistsMessage('');

        if (data.url) {
          window.location.assign(data.url);
        } else {
          try {
            const signupResponse = await fetch('http://localhost:4000/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });

            if (signupResponse.ok) {
              const signupData = await signupResponse.json();

              saveSession(signupData.session);

              dispatch({ type: 'LOGIN', payload: { token: signupData.token, user: signupData.user } });
              window.location.assign('/signup-confirm');
            } else {
              const errorData = await signupResponse.json();
              console.error('Не вдалося зареєструватися. Помилка серверу:', errorData);
            }
          } catch (error) {
            console.error('Помилка під час реєстрації:', error);
          }
        }
      }
    } else {
      const errorData = await response.json();
      console.error('Не вдалося перевірити існування користувача. Помилка серверу:', errorData);
    }
  };

  return (
    <div className='signUp__page'>
      <div className="signUp__top">
        <BackButton />
        <div className="signUp__bord">
          <h2 className='signUp__title'>Sign Up</h2>
          <p className='signUp__description'>Choose a registration method</p>
        </div>
      </div>
      {userExistsMessage && <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>{userExistsMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className='signUpForm__block'>
          <label className="signUpForm__email">
            <p className="signUpForm__text">Email:</p>
            <input
              className="signUpForm__layout signUpForm__input--email"
              type="email"
              value={email}
              onChange={handleUsernameChange}
              required
            />
          </label>
          <label className="signUpForm__password">
            <p className="signUpForm__text">Password:</p>
            <input
              className="signUpForm__layout signUpForm__input--password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span onClick={togglePasswordVisibility} className={`signUpForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} role="button"></span>
          </label>
          <button type="submit" className="signUpForm__button signUpForm__button--text">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
