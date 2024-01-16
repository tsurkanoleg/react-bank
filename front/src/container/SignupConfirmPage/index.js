import './index.css';


// SignUpConfirmPage.js
import React, { useState } from 'react';
import { useAuth } from '../../component/AuthContextProvider';
import BackButton from '../../component/back-button';
import { useNavigate } from 'react-router-dom';
import { getTokenSession, saveSession } from '../../script/session';

const SignUpConfirmPage = () => {
  const { dispatch } = useAuth();
  const [code, setcode] = useState('');
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();		
		const token = getTokenSession(); 

    try {
      const response = await fetch(`http://localhost:4000/signup-confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, token }),
      });

			

      if (response.ok) {
				const signupConfirmData = await response.json();
				
				// console.log(signupConfirmData, 'path: front/component/SignUpConfirmPage')

        dispatch({ type: 'LOGIN', payload: {
						token: signupConfirmData.session.token,
						user: signupConfirmData.session.user,
						isConfirm: signupConfirmData.session.user.isConfirm 
				} });
				saveSession(signupConfirmData.session)				
				navigate('/balance');

			
      } else {
				const errorData = await response.json();
        console.error('Не вдалося підтвердити реєстрацію', errorData);
      }
    } catch (error) {
      console.error('Помилка під час підтвердження реєстрації:', error);
    }
  };

  return (
    <div className='signupConfirm__page'>		
			
			<BackButton />			
			
			<div className="signupConfirm__bord"> 
				<h2 className='signupConfirm__title'>Confirm account</h2>
				<p className='signupConfirm__description'>Write the code you received</p>
			</div>
     
      <form onSubmit={handleConfirm} className="signupConfirm__block">
       
				<label  className="signupConfirm__code">
					<p className="signupConfirm__code--title">Confirmation Code:</p>
					<input 
						className="signupConfirm__code--input"
						type="number" 
						value={code} 
						onChange={(e) => setcode(e.target.value)} 
						required 
					/>
				</label>
				<button type="submit" className='signupConfirm__button signupConfirm__button--text'>Confirm</button>
				
      </form>
    </div>
  );
};

export default SignUpConfirmPage;


