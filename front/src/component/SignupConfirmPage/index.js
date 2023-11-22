import './index.css';

// SignUpConfirmPage.js
import React from 'react';
import SignupConfirmForm from '../SignupConfirmForm';

const SignUpConfirmPage = () => {
  return (
    <div>
      <h2>Confirm Sign Up</h2>
      <SignupConfirmForm />
    </div>
  );
};

export default SignUpConfirmPage;



















// import "./index.css";

// import React, { useState } from 'react';

// const SignupConfirmPage = () => {
//   // State для збереження даних форми
//   const [confirmationCode, setConfirmationCode] = useState('');

//   // Обробник зміни введених значень в формі
//   const handleChange = (e) => {
//     setConfirmationCode(e.target.value);
//   };

//   // Обробник відправки форми
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Додайте логіку підтвердження реєстрації тут, використовуючи confirmationCode
//     console.log('Confirmation code submitted:', confirmationCode);
//   };

//   return (
//     <div>
//       <h2>Confirm Your Signup</h2>
//       {/* Форма для підтвердження реєстрації */}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Confirmation Code:
//           <input
//             type="text"
//             value={confirmationCode}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Confirm Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupConfirmPage;





