import "./index.css";



import React, { useState } from 'react';
import BackButton from "../../component/back-button";
import { useAuth } from '../../component/AuthContextProvider';
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession } from "../../script/session";


import { useNavigate } from 'react-router-dom';

 
const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userExistsMessage, setUserExistsMessage] = useState('');
  const { dispatch } = useAuth();

	const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
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

		try {
			const session = window.session
			const res = await fetch('http://localhost:4000/signIn', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, session }),
			});

			if (res.ok) {

				const signInData = await res.json();

				const session = signInData.session;
				
				saveSession(session)

				// console.log(signInData,'===============')

				if (signInData.session.user.isConfirm === false) {
					navigate('/signup-confirm');								
				} else {
					
					saveSession(signInData.session);
					dispatch({ type: 'LOGIN', payload: { token: signInData.token, user: signInData.user } });
					navigate('/balance');
				}
			} else {
				const errorData = await res.json();
				console.error('Не вдалося увійти. Помилка серверу:', errorData);
			}
		} catch (error) {
			console.error('Помилка під час входу:', error);
		}
  };

  return (
    <div className='signIn__page'>
      <div className="signIn__top">
        <BackButton />
        <div className="signIn__bord">
					<h2 className="signIn__title">Sign in</h2>
					<p className="signIn__description">Select login method</p>
        </div>
      </div>
      {userExistsMessage && <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>{userExistsMessage}</p>}
     
		  <form onSubmit={handleFormSubmit}>
        <div className='signIn__block'>
          <label className="signIn__email">
            <p className="signIn__text">Email:</p>
            <input
              className="signIn__layout signIn__input--email"
              type="email"
              value={email}
              onChange={handleUsernameChange}
              required
            />
          </label>
          <label className="signIn__password">
            <p className="signIn__text">Password:</p>
            <input
              className="signIn__layout signIn__input--password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span onClick={togglePasswordVisibility} className={`signIn__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} role="button"></span>
          </label>
					<span className="signIn__span">
						Forgot your password? {` `}
						<a href="http://localhost:3000/recovery" className="signIn__span--href">
						Restore
						</a>
					</span>
          <button type="submit" className="signIn__button signIn__button--text">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;









// // import { useHistory } from 'react-router-dom';
// import React, { Component } from 'react';
// import BackButton from '../back-button';
// import { Form, REG_EXP_EMAIL } from '../../script/form';
// import { saveSession } from '../../script/session';

// class SigninPage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       formData: {
//         email: '',
//         password: '',
//       },
//       showPassword: false,
//     };

//     this.FIELD_NAME = {
//       EMAIL: 'email',
//       PASSWORD: 'password',
//     };

//     this.FIELD_ERROR = {
//       IS_EMPTY: 'Введіть значення в поле',
//       IS_BIG: 'Занадто довге значення, видаліть зайве',
//       EMAIL: 'Введіть коректну електронну адресу',      
//     };
//   }

//   validate = (name, value) => {
//     if (String(value).length < 1) {
//       return this.FIELD_ERROR.IS_EMPTY;
//     }

//     if (String(value).length > 30) {
//       return this.FIELD_ERROR.IS_BIG;
//     }

//     if (name === this.FIELD_NAME.EMAIL) {
//       if (!REG_EXP_EMAIL.test(String(value))) {
//         return this.FIELD_ERROR.EMAIL;
//       }
//     }
// 	};	

//   submit = async () => {

//     try {
//       const { formData } = this.state;

//       const response = await fetch('https://localhost:4000/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           [this.FIELD_NAME.EMAIL]: formData.email,
//           [this.FIELD_NAME.PASSWORD]: formData.password,
//         }),
//       });

     

// 			if (response.ok) {
// 				const data = await response.json();
// 				console.log(data)
// 				// Тут можна додатково перевірити вміст відповіді (data) на предмет помилок чи додаткової інформації.
// 				if (data.success) {					
// 					saveSession(data.session);
// 					navigate('http://localhost:3000/balance');
// 				} else {
// 					console.error('Помилка входу:', data.message);
// 				}
// 			} else {
// 				console.error('Помилка від сервера. HTTP-статус:', response.status);
// 			}


// 			const data = await response.json();
// 			console.log(data)
//       if (response.ok) {
//         saveSession(data.session);				

// 				navigate('/balance');
 
//       } else {
//         console.error('Помилка входу:', data.message);
//       }
//     } catch (error) {
//       console.error('Помилка під час входу:', error);
//     }
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       formData: {
//         ...prevState.formData,
//         [name]: value,
//       },
//     }));
//   };

//   togglePasswordVisibility = () => {
//     this.setState((prevState) => ({
//       showPassword: !prevState.showPassword,
//     }));
//   };

//   render() {
//     const { formData, showPassword } = this.state;

    // return (
    //   <div className="signIn__page">
    //     <div className="signIn__top">
    //       <BackButton />
    //       <div className="signIn__bord">
    //         <h2 className="signIn__title">Sign in</h2>
    //         <p className="signIn__description">Select login method</p>
    //       </div>
    //     </div>

    //     <form onSubmit={this.submit}>
    //       <div className="signInForm__block">
    //         <label className="signInForm__email">
    //           <p className="signInForm__text">Email:</p>
    //           <input
    //             className="signInForm__layout signInForm__input--email"
    //             type="email"
    //             name="email"
    //             value={formData.email}
    //             onChange={this.handleChange}
    //           />
    //         </label>

    //         <label className="signInForm__password">
    //           <p className="signInForm__text">Password:</p>
    //           <div className={`password-input-wrapper ${showPassword ? 'show' : 'hide'}`}>
    //             <input
    //               className="signInForm__layout signInForm__input--password"
    //               type={showPassword ? 'text' : 'password'}
    //               value={formData.password}
    //               onChange={(e) => this.handleChange({ target: { name: 'password', value: e.target.value } })}

    //               required
    //             />

    //             <span
    //               onClick={this.togglePasswordVisibility}
    //               className={`signInForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`}
    //               role="button"
    //             >
    //               {showPassword ?  'Hide' : 'Show'}
    //             </span>
    //           </div>
    //         </label>

		// 				<span className="signInForm__span">
		// 					Forgot your password?{' '}
		// 					<a href="http://localhost:3000/recovery" className="signInForm__href">
		// 						Restore
		// 					</a>
		// 				</span>

    //         <button
    //           onClick={this.submit}
    //           className="signInForm__button signInForm__button--text"
    //           type="submit"
    //         >
    //           Continue
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // );
//   }
// }

// Object.assign(SigninPage.prototype, Form.prototype);

// export default SigninPage;


