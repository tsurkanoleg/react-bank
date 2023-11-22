// SignupConfirmForm.js
import React, { useState } from 'react';
import { useAuth } from '../../component/AuthContextProvider';

const SignupConfirmForm = () => {
  const { dispatch } = useAuth();
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      // Ваш код для відправки коду підтвердження на сервер
      const response = await fetch('http://localhost:4000/recovery-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmationCode }),
      });

      if (response.ok) {
        // Оновлення контексту після підтвердження реєстрації
        dispatch({ type: 'LOGIN', payload: { confirm: true } });
      } else {
        // Обробка помилок підтвердження реєстрації
        console.error('Failed to confirm sign up');
      }
    } catch (error) {
      console.error('Error during sign up confirmation:', error);
    }
  };

  return (
    <form onSubmit={handleConfirm} className='signupConfirmForm__page'>
      <label>
        Confirmation Code:
        <input type="text" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} required />
      </label>
      <button type="submit">Confirm</button>
    </form>
  );
};

export default SignupConfirmForm;
