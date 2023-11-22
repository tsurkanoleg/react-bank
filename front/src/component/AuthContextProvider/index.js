// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Створення контексту
const AuthContext = createContext();

// Початковий стан аутентифікації
const initialState = {
  token: null,
  user: null,
};

// Типи дій для useReducer
const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

// Редуктор для управління станом аутентифікації
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

// Компонент-обгортка для надання контексту
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token, user) => {
    dispatch({ type: actionTypes.LOGIN, payload: { token, user } });
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Кастомний хук для спрощеного доступу до контексту
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth повинен використовуватися в межах AuthContextProvider');
  }
  return context;
};

// Експорт типів дій
export { actionTypes, useAuth };

