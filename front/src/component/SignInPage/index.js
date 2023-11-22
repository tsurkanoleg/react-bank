

import "./index.css";



// SigninPage.js
import React, { Component } from 'react';
import BackButton from '../back-button';
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession } from '../../script/session';

class SigninPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: '',
      },
      showPassword: false,
    };

    this.FIELD_NAME = {
      EMAIL: 'email',
      PASSWORD: 'password',
    };

    this.FIELD_ERROR = {
      IS_EMPTY: 'Введіть значення в поле',
      IS_BIG: 'Занадто довге значення, видаліть зайве',
      EMAIL: 'Введіть коректну електронну адресу',
      PASSWORD: 'Пароль повинен містити принаймні 8 символів, включаючи принаймні одну букву та одну цифру',
    };
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    }

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD;
      }
    }
  };

  submit = async () => {
    try {
      const { formData } = this.state;

      const response = await fetch('https://localhost:4000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [this.FIELD_NAME.EMAIL]: formData.email,
          [this.FIELD_NAME.PASSWORD]: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        saveSession(data.session);

				// this.props.history.push('/confirmation-page');
        // window.location.assign('/recovery');

				const navigate = this.props.navigate;
        navigate('/balance');
      } else {
        console.error('Помилка входу:', data.message);
      }
    } catch (error) {
      console.error('Помилка під час входу:', error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { formData, showPassword } = this.state;

    return (
      <div className="signIn__page">
        <div className="signIn__top">
          <BackButton />
          <div className="signIn__bord">
            <h2 className="signIn__title">Sign in</h2>
            <p className="signIn__description">Select login method</p>
          </div>
        </div>

        <form onSubmit={this.submit}>
          <div className="signInForm__block">
            <label className="signInForm__email">
              <p className="signInForm__text">Email:</p>
              <input
                className="signInForm__layout signInForm__input--email"
                type="email"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
              />
            </label>

            <label className="signInForm__password">
              <p className="signInForm__text">Password:</p>
              <div className={`password-input-wrapper ${showPassword ? 'show' : 'hide'}`}>
                <input
                  className="signInForm__layout signInForm__input--password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => this.handleChange({ target: { name: 'password', value: e.target.value } })}

                  required
                />

                <span
                  onClick={this.togglePasswordVisibility}
                  className={`signInForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`}
                  role="button"
                >
                  {/* Ваші SVG-зображення для приховання і показу паролю */}
                  {showPassword ?  'Hide' : 'Show'}
                </span>
              </div>
            </label>

						<span className="signInForm__span">
							Forgot your password?{' '}
							<a href="http://localhost:3000/recovery" className="signInForm__href">
								Restore
							</a>
						</span>

            <button
              onClick={this.submit}
              className="signInForm__button signInForm__button--text"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Object.assign(SigninPage.prototype, Form.prototype);

export default SigninPage;












































































// import React, { Component } from 'react';
// import BackButton from '../back-button';
// import {
//   Form,
//   REG_EXP_EMAIL,
//   REG_EXP_PASSWORD,
// } from '../../script/form'
// import { saveSession } from '../../script/session'

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
//   }

// 	FIELD_NAME = {
//     EMAIL: 'email',
//     PASSWORD: 'password',
//   };

//   FIELD_ERROR = {
//     IS_EMPTY: 'Введіть значення в поле',
//     IS_BIG: 'Дуже довге значення, приберіть зайве',
//     EMAIL: 'Введіть коректне значення e-mail адреси',
//   };

//   validate = (name, value) => {
//     if (String(value).length < 1) {
//       return this.FIELD_ERROR.IS_EMPTY;
//     }

//     if (String(value).length > 20) {
//       return this.FIELD_ERROR.IS_BIG;
//     }

//     if (name === this.FIELD_NAME.EMAIL) {
//       if (!REG_EXP_EMAIL.test(String(value))) {
//         return this.FIELD_ERROR.EMAIL;
//       }
//     }
//   };

//   submit = async () => {
    // if (this.disabled === true) {
    //   this.validateAll();
    // } else {
    //   console.log(this.value);

//       this.setAlert('progress', 'Завантаження...');

//       try {
//         const res = await fetch('/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: this.convertData(),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           console.log(data.session);
//           this.setAlert('success', data.message);
//           saveSession(data.session);
//           window.location.assign('/');
//         } else {
//           this.setAlert('error', data.message);
//         }
//       } catch (error) {
//         this.setAlert('error', error.message);
//       }
//     }
//   };

//   convertData = () => {
//     return JSON.stringify({
//       [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
//       [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
//     });
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

//   // handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Додайте логіку увіходу в систему тут, використовуючи дані з formData
//   //   console.log('Form submitted with data:', this.state.formData);
//   //   // Очищення полів форми після відправки
//   //   this.setState({
//   //     formData: {
//   //       email: '',
//   //       password: '',
//   //     },
//   //   });
//   // };

//   togglePasswordVisibility = () => {
//     this.setState((prevState) => ({
//       showPassword: !prevState.showPassword,
//     }));
//   };

//   render() {
//     const { formData, showPassword } = this.state;

//     return (
//       <div className="signIn__page">
//         <div className="signIn__top">
//           <BackButton />
//           <div className="signIn__bord">
//             <h2 className="signIn__title">Sign In</h2>
//             <p className="signIn__description">Select login method</p>
//           </div>
//         </div>

//         {/* Форма для увіходу в систему */}
//         <form onSubmit={this.submit}>
//           <div className="signInForm__block">
//             <label className="signInForm__email">
//               <p className="signInForm__text">Email:</p>
//               <input
//                 className="signInForm__layout signInForm__input--email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={this.handleChange}
//               />
//             </label>

// 						<label className="signInForm__password">
// 							<p className="signInForm__text">Password:</p>
// 							<div className={`password-input-wrapper ${showPassword ? 'show' : 'hide'}`}>
// 								<input
// 									className="signInForm__layout signInForm__input--password"
// 									type={showPassword ? 'text' : 'password'}
// 									value={formData.password}
// 									onChange={(e) => this.handleChange({ target: { name: 'password', value: e.target.value } })}
// 									required
// 								/>

// 								<span
// 									onClick={this.togglePasswordVisibility}
// 									className={`signUpForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`}
// 									role="button"
// 								>
// 									{/* Ваші SVG-зображення для приховання і показу паролю */}
// 									{showPassword ? 'Hide' : 'Show'}
// 								</span>
// 							</div>
// 						</label>


//             <button
// 						onClick={this.submit}
//               className="signInForm__button signInForm__button--text"
//               type="submit"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// Object.assign(SigninPage.prototype, Form.prototype);

// export default SigninPage;























// import React, { useState } from 'react';
// import BackButton from "../back-button";
// import Form from "../../script/form"

// const SigninPage = () => {
//   // State для збереження даних форми
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

// 	const [showPassword, setShowPassword] = useState(false);

//   // Обробник зміни введених значень в формі
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Обробник відправки форми
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Додайте логіку увіходу в систему тут, використовуючи дані з formData
//     console.log('Form submitted with data:', formData);
//     // Очищення полів форми після відправки
//     setFormData({
//       email: '',
//       password: '',
//     });
//   };

// 	const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="signIn__page">
// 			<div className="signIn__top">
// 				<BackButton/>
				
// 				<div className="signIn__bord">
// 					<h2 className='signIn__title'>Sign In</h2>
// 					<p className="signIn__description">Select login method</p>
// 				</div>
// 			</div>

//       {/* Форма для увіходу в систему */}
//       <form onSubmit={handleSubmit}>
//         <div className='signInForm__block'>
// 					<label className="signInForm__email">
// 						<p className="signInForm__text">Email:</p>
// 						<input
// 							className="signInForm__layout signInForm__input--email"
// 							type="email"
// 							name="email"
// 							value={formData.email}
// 							onChange={handleChange}
// 						/>
// 					</label>

// 					{/* <label className="signUpForm__password">
// 						<p className="signUpForm__text">Password:</p>
// 						<input
// 							type="password"
// 							name="password"
// 							value={formData.password}
// 							onChange={handleChange}
// 						/>
// 					</label> */}

// 					<label className="signInForm__password">
// 					<p className="signInForm__text">Password:</p>
// 					<div className={`password-input-wrapper ${showPassword ? 'show' : 'hide'}`}>
// 						<input 
// 						className="signInForm__layout signInForm__input--password" 
// 						type={showPassword ? 'text' : 'password'} 
// 						value={formData.password} 
// 						onChange={handleChange} 
// 						required />
						
// 						<span onClick={togglePasswordVisibility} className={`signUpForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} role="button">
// 							{/* Ваші SVG-зображення для приховання і показу паролю */}
// 							{showPassword ? 'Hide' : 'Show'}
// 						</span>
// 					</div>
// 				</label>
					
// 					<button  
// 						onClick={}
// 						className="signInForm__button signInForm__button--text" 
// 						type="submit"
// 					>
// 						Sign In
// 					</button>
// 				</div>
//       </form>
//     </div>
//   );
// };

// export default SigninPage;
