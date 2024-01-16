import "./index.css";

import React, { useState } from 'react';
import BackButton from "../../component/back-button";
import { REG_EXP_PASSWORD } from '../../script/form';
import { saveSession } from "../../script/session";

import { useNavigate } from 'react-router-dom';

const RecoveryConfirmForm = () => {

	const navigate = useNavigate();

  const FIELD_NAME = {
    CODE: 'code',
    PASSWORD: 'password',
  };

  const FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
    PASSWORD: 'Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру',
  };

  const [formData, setFormData] = useState({
    [FIELD_NAME.CODE]: '',
    [FIELD_NAME.PASSWORD]: '',
  });

  const [formErrors, setFormErrors] = useState({
    [FIELD_NAME.CODE]: '',
    [FIELD_NAME.PASSWORD]: '',
  });

  const [alert, setAlert] = useState({
    type: 'disabled',
    message: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const validate = (name, value) => {
    if (String(value).length < 1) {
      return FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return FIELD_ERROR.IS_BIG;
    }

    if (name === FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return FIELD_ERROR.PASSWORD;
      }
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: validate(name, value),
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async () => {
    const validateAll = () => {
      Object.keys(FIELD_NAME).forEach((name) => {
        const error = validate(name, formData[name]);
        if (error) {
          setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: error,
          }));
        }
      });
    };

    validateAll();

    if (Object.values(formErrors).every((error) => error === '')) {
      setAlert({
        type: 'progress',
        message: 'Завантаження...',
      });

      try {
        const response = await fetch('http://localhost:4000/recovery-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: Number(formData[FIELD_NAME.CODE]),
            password: formData[FIELD_NAME.PASSWORD],
          }),
        });

        const data = await response.json();

				console.log(data.session, 'data===')			

        if (response.ok) {
					saveSession(data.session);

          setAlert({
            type: 'success',
            message: data.message,
          });
          navigate(data.redirectUrl);
        } else {
          setAlert({
            type: 'error',
            message: data.message,
          });
        }
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.message,
        });
      }
    }
  };

  return (
    <div className="recovery__confirm--page">
      <div className="recovery__confirm--top">
        <BackButton/>
        <div className="recovery__confirm--bord">
          <h1 className="recovery__confirm--title">Recover password</h1>
          <p className="recovery__confirm--description">Write the code you received</p>
        </div>
      </div>
      <div className="recovery__confirm--form">
        <div className="recovery__confirm--code">
          <label className="recovery__confirm--text" htmlFor={FIELD_NAME.CODE}>
            Code:
          </label>
          <input
            className="recovery__confirm--layout recovery__confirm--input--code"
            type="number"
            id={FIELD_NAME.CODE}
            name={FIELD_NAME.CODE}
            value={formData[FIELD_NAME.CODE]}
            onChange={handleChange}
          />
          <span className="form__error">
            {formErrors[FIELD_NAME.CODE]}
          </span>
        </div>
        <div className="recovery__confirm--password">
          <label className="recovery__confirm--text" htmlFor={FIELD_NAME.PASSWORD}>
            New password:
          </label>
          <div className="recovery__confirm--password">
            <input
              className="recovery__confirm--layout recovery__confirm--input--password"
              type={showPassword ? 'text' : 'password'}
              id={FIELD_NAME.PASSWORD}
              name={FIELD_NAME.PASSWORD}
              value={formData[FIELD_NAME.PASSWORD]}
              onChange={handleChange}
            />
            <span
              onClick={handleTogglePassword}
              className={`recovery__confirm--icon toggle-password-button__${showPassword ? 'show' : 'hide'}`}
              role="button"
            />
          </div>
          <span className="form__error">
            {formErrors[FIELD_NAME.PASSWORD]}
          </span>
        </div>
      </div>
      <button
        className="recovery__confirm--button recovery__confirm--button--text"
        type="button"
        onClick={handleSubmit}
      >
        Restore password
      </button>
      <span className={`alert alert--${alert.type}`}>
        {alert.message}
      </span>
    </div>
  );
};

export default RecoveryConfirmForm;





















// import BackButton from "../back-button";

// import { REG_EXP_PASSWORD } from '../../script/form';
// import React, { Component } from 'react';

// class RecoveryConfirmForm extends Component {
	
//   constructor(props) {
//     super(props);

//     this.FIELD_NAME = {
//       CODE: 'code',
//       PASSWORD: 'password',
//     };

//     this.FIELD_ERROR = {
//       IS_EMPTY: 'Введіть значення в поле',
//       IS_BIG: 'Дуже довге значення, приберіть зайве',
//       PASSWORD:
//         'Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру',
//     };

//     this.state = {
//       formData: {
//         [this.FIELD_NAME.CODE]: '',
//         [this.FIELD_NAME.PASSWORD]: '',
//       },
//       formErrors: {
//         [this.FIELD_NAME.CODE]: '',
//         [this.FIELD_NAME.PASSWORD]: '',
//       },
//       alert: {
//         type: 'disabled',
//         message: '',
//       },
// 			showPassword: false,
//     };
//   }

	

//   validate = (name, value) => {
//     const { FIELD_ERROR } = this;

//     if (String(value).length < 1) {
//       return FIELD_ERROR.IS_EMPTY;
//     }

//     if (String(value).length > 20) {
//       return FIELD_ERROR.IS_BIG;
//     }

//     if (name === this.FIELD_NAME.PASSWORD) {
//       if (!REG_EXP_PASSWORD.test(String(value))) {
//         return FIELD_ERROR.PASSWORD;
//       }
//     }

//     return '';
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       formData: {
//         ...prevState.formData,
//         [name]: value,
//       },
//       formErrors: {
//         ...prevState.formErrors,
//         [name]: this.validate(name, value),
//       },
//     }));
//   };

// 	handleTogglePassword = () => {
//     this.setState((prevState) => ({
//       showPassword: !prevState.showPassword,
//     }));
//   };

//   handleSubmit = async () => {

//     const { formData } = this.state;
//     const validateAll = () => {
//       Object.keys(this.FIELD_NAME).forEach((name) => {
//         const error = this.validate(name, formData[name]);
//         if (error) {
//           this.setState((prevState) => ({
//             formErrors: {
//               ...prevState.formErrors,
//               [name]: error,
//             },
//           }));
//         }
//       });
//     };

//     validateAll();

//     if (
//       Object.values(this.state.formErrors).every(
//         (error) => error === ''
//       )
//     ) {
//       this.setState({
//         alert: {
//           type: 'progress',
//           message: 'Завантаження...',
//         },
//       });

//       try {
//         const response = await fetch('http://localhost:4000/recovery-confirm', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             code: Number(formData[this.FIELD_NAME.CODE]),
//             password: formData[this.FIELD_NAME.PASSWORD],
//           }),
//         });

//         const data = await response.json();

				

//         if (response.ok) {
//           this.setState({
//             alert: {
//               type: 'success',
//               message: data.message,		
// 							url: data.redirectUrl
//             },
//           });

					

//         } else {
//           this.setState({
//             alert: {
//               type: 'error',
//               message: data.message,
//             },
//           });
//         }
//       } catch (error) {
//         this.setState({
//           alert: {
//             type: 'error',
//             message: error.message,
//           },
//         });
//       }
//     }
//   };

//   render() {
//     const { FIELD_NAME } = this;
//     const { formData, formErrors, alert } = this.state;

//     return (

//       <div className="recovery__confirm--page">

//        	<div className="recovery__confirm--top">
// 					<BackButton/>  
					
// 					<div className="recovery__confirm--bord">
// 						<h1  className="recovery__confirm--title">Recover password</h1>
// 						<p className="recovery__confirm--description">Write the code you received</p>
// 					</div>
// 				</div>
				

// 				<div className="recovery__confirm--form">

// 					<div className="recovery__confirm--code">
// 						<label 
// 							className="recovery__confirm--text" 
// 							htmlFor={FIELD_NAME.CODE}
// 						>
// 							Code:
// 						</label>

// 						<input
//               className="recovery__confirm--layout recovery__confirm--input--code"
// 							type="number"
// 							id={FIELD_NAME.CODE}
// 							name={FIELD_NAME.CODE}
// 							value={formData[FIELD_NAME.CODE]}
// 							onChange={this.handleChange}
// 						/>
// 						<span className="form__error">
// 							{formErrors[FIELD_NAME.CODE]}
// 						</span>
// 					</div>
				

// 					<div className="recovery__confirm--password">
// 						<label  
// 							className="recovery__confirm--text" 
// 							htmlFor={FIELD_NAME.PASSWORD}
// 						>
// 							New password:
// 						</label>

// 						<div className="recovery__confirm--password">   
//               <input
//                 className="recovery__confirm--layout recovery__confirm--input--password"              
//                 type={this.state.showPassword ? 'text' : 'password'}
//                 id={FIELD_NAME.PASSWORD}
//                 name={FIELD_NAME.PASSWORD}
//                 value={formData[FIELD_NAME.PASSWORD]}
//                 onChange={this.handleChange}
//               />

// 							<span 
// 								onClick={this.handleTogglePassword} 
// 								className={`recovery__confirm--icon toggle-password-button__${this.state.showPassword ? 'show' : 'hide'}`} 
// 								role="button"
// 							>								
// 							</span>
//             </div>

// 						<span className="form__error">
// 							{formErrors[FIELD_NAME.PASSWORD]}
// 						</span>

// 					</div>           
// 				</div>

// 				<button
// 					className="recovery__confirm--button recovery__confirm--button--text"
// 					type="button"
// 					onClick={this.handleSubmit}
// 				>
// 					Restore password
// 				</button>

// 				<span className={`alert alert--${alert.type}`}>
// 					{alert.message}
// 				</span>

// 			</div>
//     );
//   }
// }

// export default RecoveryConfirmForm;

