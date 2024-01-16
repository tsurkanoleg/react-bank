import "./index.css";

import React, { useState } from 'react';
import BackButton from "../../component/back-button";
import { useAuth } from '../../component/AuthContextProvider';
import { deleteSession, saveSession } from "../../script/session";

import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {

	const navigate = useNavigate();

	const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');	

  const [oldPassword, setOldPassword] = useState('');	
  const [newPassword, setNewPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
	const { dispatch } = useAuth();

	const [alert, setAlert] = useState({
    type: 'disabled',
    message: '',
  });
	
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


	

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
		try { 
			const session = window.session
			// saveSession(session)

			// console.log(session, 'path:front/container/settingsPage.32') 
			const res = await fetch('http://localhost:4000/settings/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				
				body: JSON.stringify({ password, newEmail, session}),
			});

			const data = await res.json();			

			// console.log(data, 'path:front/container/SettingsPage.44') 

			if (res.ok) {				
				saveSession(data.newSession)

				setAlert({
					type: 'success',
					message: data.message,
				});				

				navigate(data.redirectUrl);
			} else {
				console.log('error', data.message, 'path:front/container/SettingsPage.50');
			}
		} catch (error) {
			console.log('error', error.message, 'path:front/container/SettingsPage.53');
		}
    
  };



  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
			const email = window.session.user.email
			const res = await fetch('http://localhost:4000/settings/password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ oldPassword, newPassword, email }),
			});

			const data = await res.json();

			if (res.ok) {

				saveSession(data.newSession)

				console.log(data)

				setAlert({
					type: 'success',
					message: data.message,
				});				

				navigate(data.redirectUrl);
			} else {
				console.log('error', data.message, 'path:front/container/SettingsPage.138');
			}
		} catch (error) {
			alert('error', error.message, 'path:front/container/SettingsPage.97');
		}

		
  };

	const logout = () => {
		deleteSession();
		dispatch({type: 'LOGOUT'});
		window.transactionHistory = null;
		
	 	window.location.assign('/');
	}



  return (
    <div className='settings__page--body'>

			<header className="settings__header">
				<BackButton/>
				<h2>Settings</h2>
				<div></div>
			</header>





			<form  onSubmit={handleSubmitEmail} className="settings__change">
				<span className="settings__change--name ">Change email</span>
					
				<label className="settings__change--elem">
					Email:
					<input
						className="settings__change--email"
						type="email"
						value={newEmail}
						onChange={(e) => setNewEmail(e.target.value)}
						placeholder="example@gmail.com"
					/>
				</label>

				<label className="settings__change--elem">
					Password:
					<input
              className="settings__change--password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
							placeholder="********"
            />
						<span onClick={togglePasswordVisibility} 
							className={`settingsForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} 
							// role="button"
						/>
				</label>					
				<button type="submit" className="settings__button">Save Email</button>
			</form>		





			<form onSubmit={handleSubmitPassword} className="settings__change">
				<span className="settings__change--name ">Change email</span> 
				<label className="settings__change--elem">
					Old Password:
					<input
              className="settings__change--password"
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
            	onChange={(e) => setOldPassword(e.target.value)}
              required
							placeholder="********"
            />
						<span onClick={togglePasswordVisibility} 
							className={`signUpForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} 
							// role="button"
						/>
				</label>

				<label className="settings__change--elem">
					New Password:
					<input
						className="settings__change--password"
						type={showPassword ? 'text' : 'password'}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
						placeholder="********"
					/>
					<span onClick={togglePasswordVisibility} 
						className={`signUpForm__icon toggle-password-button__${showPassword ? 'show' : 'hide'}`} 
						// role="button"
					/>						
				</label>
					
				<button type="submit" className="settings__button settings__button--text">Save Password</button>
			</form>



      
      <button className="settings__button settings__button--logout" onClick={logout}>Logout</button>
    </div>
  );
};

export default SettingsPage;
















