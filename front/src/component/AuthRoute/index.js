import "./index.css";

import React from 'react';
import { useAuth } from '../AuthContextProvider';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const { state } = useAuth();

  return state.token ? <Navigate to="/balance" /> : <>{children}</>;
};

export default AuthRoute;



// (
// import React, { ReactNode } from 'react';
// import { useAuth } from './AuthContext';
// import { Route, Navigate } from 'react-router-dom';

// interface AuthRouteProps {
//   children: ReactNode;
// }

// const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
//   const { state } = useAuth();

//   return state.token ? <Navigate to="/balance" /> : <>{children}</>;
// };

// export default AuthRoute;)


// import React from 'react';
// import { useAuth } from '../../page/AuthContext';
// import { Route, Navigate } from 'react-router-dom';

// const AuthRoute = ({ element }) => {
//   const { state } = useAuth();

//   return state.token ? <Navigate to="/balance" /> : element;
// };

// export default AuthRoute;