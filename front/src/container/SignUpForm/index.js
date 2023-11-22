import "./index.css"




import React, { useState } from 'react';
import { useAuth } from '../../component/AuthContextProvider';

const SignUpForm = ({ history }) => {
	const { dispatch } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Ваш код для відправки даних на сервер для реєстрації
      // Очікується, що сервер поверне токен та інформацію про користувача
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
				 dispatch({ type: 'LOGIN', payload: { token: data.token, user: data.user } });

				 history.push('/signup-confirm');
      } else {
        // Обробка помилок реєстрації
        console.log('Failed to sign up');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className='signUpForm__block'>
        <label className="signUpForm__email">
          <p className="signUpForm__text">Email:</p>
          <input
            className="signUpForm__layout signUpForm__input--email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

				<label className="signUpForm__password">
					<p className="signUpForm__text">Password:</p>
					<div className={`password-input-wrapper ${showPassword ? 'show' : 'hide'}`}>
						<input className="signUpForm__layout signUpForm__input--password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
						<span onClick={togglePasswordVisibility} className={`signUpForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} role="button">
							{/* Ваші SVG-зображення для приховання і показу паролю */}
							{showPassword ? 'Hide' : 'Show'}
						</span>
					</div>
				</label>



        <button type="submit" className="signUpForm__button signUpForm__button--text">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;



