import "./index.css";



import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // const token = localStorage.getItem('sessionAuth'); 

	const navigate = useNavigate();

  if (!window.session.token) {
   	navigate('/'); // Перенаправлення на головну сторінку, можливо, змініть шлях відповідно до ваших потреб
    return null; // або інша логіка для відображення сторінки з помилкою або логіном
  } else {
		navigate('/signup-confirm')
		
	}

  // Якщо токен існує, повертайте переданий елемент Route
  return element;
};

export default PrivateRoute;

