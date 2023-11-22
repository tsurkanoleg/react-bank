// App.js
// import React, {useReducer, Provider, useContext} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



// import { AuthContextProvider } from '../src/component/AuthContextProvider';  

import WellcomePage from './container/WelcomePage';
import SignupPage from '../src/component/SignupPage';
import RecoveryPage from '../src/component/RecoveryPage';




import AuthRoute from '../src/component/AuthRoute';
import PrivateRoute from '../src/component/PrivateRoute';

import SignupConfirmPage from '../src/component/SignupConfirmPage';
import SigninPage from '../src/component/SignInPage';


import RecoveryConfirmPage from '../src/component/RecoveryConfirmPage';

import BalancePage from '../src/page/BalancePage';
import NotificationsPage from '../src/component/NotificationList'; // ??????????????????????????
import SettingsPage from '../src/container/SettingsPage';
import RecivePage from '../src/page/RecivePage';

import SendPage from '../src/page/SendPage.js';
import TransactionPage from '../src/component/TransactionPage';


import  NotificationPage  from '../src/page/NotificationPage';

import Error from '../src/component/Error';



const App = () => {
	// const { notifications } = useContext(NotificationsProvider);

	
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
            path="/signup"
            element={(
              <AuthRoute>
                <SignupPage />
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



				{/* <div style={{ display: "grid", gap: "5px", margin: "15px" }}>
					<a href="http://localhost:3000/">3000/</a>
					<a href="http://localhost:3000/signin">3000/signin</a>
					<a href="http://localhost:3000/recovery">3000/recovery</a>
					<a href="http://localhost:3000/recovery-confirm">3000/recovery-confirm</a>
					<a href="http://localhost:3000/signup">3000/signup</a>
					<br/>

					<a href="http://localhost:3000/signup-confirm">3000/signup-confirm</a>
									
					<br/>
					<a href="http://localhost:3000/settings">3000/settings</a>
					<a href="http://localhost:3000/notification">3000/notification</a>
					<a href="http://localhost:3000/balance">3000/balance</a>
					<a href="http://localhost:3000/send">3000/send</a>
					<a href="http://localhost:3000/recive">3000/recive</a>
					<a href="http://localhost:3000/transaction">
						3000/transaction/:trainsactionId
					</a>
				</div> */}

        
			</Routes>



		
  );
};


// const App = () => {
	
//   return (
//     <AuthContextProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route 
//             path="/"
//             element={
//               <AuthRoute>
//                 <WellcomePage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <AuthRoute>
//                 <SignupPage />
//               </AuthRoute>
//             }
//           />
//           {/* Інші маршрути... */}
//         </Routes>
//       </BrowserRouter>
//     </AuthContextProvider>
//   );
// };


// const App = () => {
//   return (
//     <AuthContextProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <AuthRoute>
//                 <WellcomePage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <AuthRoute>
//                 <SignupPage />
//               </AuthRoute>
//             }
//           />
//           {/* Інші маршрути... */}
//         </Routes>
//       </BrowserRouter>
//     </AuthContextProvider>
//   );
// };


// const App = () => {
//   return (
//     <AuthContextProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             index
//           >
//             <AuthRoute>
//               <WellcomePage />
//             </AuthRoute>
//           </Route>
//           <Route
//             path="/signup"
//           >
//             <AuthRoute>
//               <SignupPage />
//             </AuthRoute>
//           </Route>
//           <Route
//             path="/signup-confirm"
//           >
//             <PrivateRoute>
//               <SignupConfirmPage />
//             </PrivateRoute>
//           </Route>
//           <Route
//             path="/signin"
//           >
//             <AuthRoute>
//               <SigninPage />
//             </AuthRoute>
//           </Route>
//           <Route
//             path="/recovery"
//           >
//             <AuthRoute>
//               <RecoveryPage />
//             </AuthRoute>
//           </Route>
//           <Route
//             path="/recovery-confirm"
//           >
//             <AuthRoute>
//               <RecoveryConfirmPage />
//             </AuthRoute>
//           </Route>
//           <Route
//             path="/balance"
//           >
//             <PrivateRoute>
//               <BalancePage />
//             </PrivateRoute>
//           </Route>
//           <Route
//             path="/notifications"
//           >
//             <PrivateRoute>
//               <NotificationsPage />
//             </PrivateRoute>
//           </Route>
//           <Route
//             path="/settings"
//           >
//             <PrivateRoute>
//               <SettingsPage />
//             </PrivateRoute>
//           </Route>
//           <Route
//             path="/recive"
//           >
//             <PrivateRoute>
//               <RecivePage />
//             </PrivateRoute>
//           </Route>
//           <Route
//             path="/send"
//           >
//             <PrivateRoute>
//               <SendPage />
//             </PrivateRoute>
//           </Route>
//           <Route
//             path="/transaction/:transactionId"
//           >
//             <PrivateRoute>
//               <TransactionPage />
//             </PrivateRoute>
//           </Route>
//           <Route path="*" element={<Error />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthContextProvider>
//   );
// };


// const App = () => {
//   return (
//     <AuthContextProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             index
//             element={
//               <AuthRoute>
//                 <WellcomePage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <AuthRoute>
//                 <SignupPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup-confirm"
//             element={
//               <PrivateRoute>
//                 <SignupConfirmPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/signin"
//             element={
//               <AuthRoute>
//                 <SigninPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/recovery"
//             element={
//               <AuthRoute>
//                 <RecoveryPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/recovery-confirm"
//             element={
//               <AuthRoute>
//                 <RecoveryConfirmPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/balance"
//             element={
//               <PrivateRoute>
//                 <BalancePage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/notifications"
//             element={
//               <PrivateRoute>
//                 <NotificationsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               <PrivateRoute>
//                 <SettingsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/recive"
//             element={
//               <PrivateRoute>
//                 <RecivePage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/send"
//             element={
//               <PrivateRoute>
//                 <SendPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/transaction/:transactionId"
//             element={
//               <PrivateRoute>
//                 <TransactionPage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="*" element={<Error />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthContextProvider>
//   );
// };

export default App;
