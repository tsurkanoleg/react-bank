import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '../src/component/AuthContextProvider';
import App from './App';



import "./normalize.css";
import "./index.css";
import { loadSession } from './script/session'


loadSession()

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')	
);

