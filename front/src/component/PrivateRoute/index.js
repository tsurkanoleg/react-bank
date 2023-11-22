import "./index.css";

import { useAuth } from '../../component/AuthContextProvider';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { state } = useAuth();

  return state.token ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
