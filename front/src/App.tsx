import { Routes, Route } from 'react-router-dom';
import { loadSession } from './script/session'


import AuthRoute from '../src/component/AuthRoute';
import PrivateRoute from '../src/component/PrivateRoute';


import WellcomePage from './container/WelcomePage';
import SignupPage from '../src/component/SignupPage';

import SignupConfirmPage from '../src/component/SignupConfirmPage';



import SigninPage from '../src/component/SignInPage';


import RecoveryPage from '../src/component/RecoveryPage';





import RecoveryConfirmPage from '../src/component/RecoveryConfirmPage';

import BalancePage from '../src/page/BalancePage';
import SettingsPage from '../src/container/SettingsPage';
import RecivePage from '../src/page/RecivePage';

import SendPage from '../src/page/SendPage.js';
import TransactionPage from './component/TransactionPage';


import  NotificationPage  from '../src/page/NotificationPage';

import Error from '../src/component/Error';


loadSession();

const App = () => {
	
	
  return (
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
					<PrivateRoute element={<BalancePage />} />   
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
				path="/recive"
				element={
					<PrivateRoute element={<RecivePage />}/>							
				}
			/>
			<Route
				path="/send"
				element={
					<PrivateRoute element={<SendPage />}/>							
				}
			/>

			{/* <Route
				path="/transaction/:transactionId"
				element={
					<PrivateRoute>
						<TransactionPage />
					</PrivateRoute>
				}
			/> */}

			
			<Route
				path="/transaction/:transactionId"
				element={
					<PrivateRoute element={<TransactionPage  />}/>
				}
			/>


			<Route path="*" element={<Error />} /> 

			
		</Routes>
		
  );
};




export default App;
