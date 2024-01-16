import { Routes, Route } from 'react-router-dom';
import { loadSession } from './script/session'

import {AuthContextProvider} from '../src/component/AuthContextProvider'
import AuthRoute from '../src/component/AuthRoute';
import PrivateRoute from '../src/component/PrivateRoute';


import WellcomePage from './container/WelcomePage';
import SignupPage from './container/SignupPage';
import SignupConfirmPage from './container/SignupConfirmPage';
import SigninPage from './container/SignInPage';
import RecoveryPage from './container/RecoveryPage';
import RecoveryConfirmPage from './container/RecoveryConfirmPage';
import Balance from './container/Balance';
import SettingsPage from '../src/container/SettingsPage';
import ReceivePage from '../src/container/ReceivePage';
import SendPage from './container/SendPage/index.js';
import TransactionPage from './container/TransactionPage';

import  NotificationPage  from './container/NotificationList';

import Error from '../src/component/Error';


loadSession();


const App = () => {
	
  return (
		<AuthContextProvider >
			<Routes>
				<Route
					path="/"
					element={(
						<AuthRoute>
							<WellcomePage />
						</AuthRoute>
					)}
				/>
				
				<Route
					path="/signin"
					element={(
						<AuthRoute>
							<SigninPage />
						</AuthRoute>
					)}
				/>
				<Route
					path="/signup"
					element={(
						<AuthRoute>
							<SignupPage	
								history="/signup"
							/>
						</AuthRoute>
					)}
				/>
				<Route
					path="/signup-confirm"
					element={
						<PrivateRoute element={<SignupConfirmPage />}/>
						
					}
				/>
				<Route
					path="/recovery"
					element={
						<AuthRoute>
							<RecoveryPage />
						</AuthRoute>
					}
				/>
				<Route
					path="/recovery-confirm"
					element={
						<AuthRoute>
							<RecoveryConfirmPage />
						</AuthRoute>
					}
				/>
				<Route
					path="/balance"
					element={
						<PrivateRoute element={<Balance />} />   
					}
				/>
				<Route
					path="/notifications"
					element={
						<PrivateRoute element={<NotificationPage />}/>              
					}
				/>

				<Route
					path="/settings"
					element={
						<PrivateRoute element={<SettingsPage />}/>							
					}
				/>
				<Route
					path="/receive"
					element={
						<PrivateRoute element={<ReceivePage />}/>							
					}
				/>
				<Route
					path="/send"
					element={
						<PrivateRoute element={<SendPage />}/>							
					}
				/>

				<Route
					path="/transaction/:transactionId"
					element={
						<PrivateRoute element={<TransactionPage  />}/>
					}
				/>


				<Route path="*" element={<Error />} /> 

				
			</Routes>

		</AuthContextProvider>
		
  );
};




export default App;
