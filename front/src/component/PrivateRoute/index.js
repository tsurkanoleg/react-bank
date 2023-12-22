import "./index.css";



import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../../script/session';

const PrivateRoute = ({ element }) => {
  // const token = localStorage.getItem('sessionAuth'); 

	const navigate = useNavigate();

	useEffect ( () => {
		const checkToken = async () => {
			const token = getSession()?.token;
			if (!token) {
					navigate('/'); // Перенаправлення на головну сторінку, можливо, змініть шлях відповідно до ваших потреб
				return null; // або інша логіка для відображення сторінки з помилкою або логіном
			} else {
				navigate('/signup-confirm')
				
			}
		};
		
		checkToken();
  }, [navigate]);
  

  // Якщо токен існує, повертайте переданий елемент Route
  return element;
};

export default PrivateRoute;

