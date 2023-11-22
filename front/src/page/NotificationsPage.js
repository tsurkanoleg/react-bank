// YourNotificationsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const YourNotificationsContext = createContext();

export const YourNotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Моделюємо отримання даних повідомлень (приклад)
  useEffect(() => {
    // Симуляція отримання даних з сервера чи іншого джерела

    // Замініть на реальний запит на сервер або іншу логіку отримання даних
    const fetchData = async () => {
      // Приклад даних з сервера (може змінюватися в залежності від реального джерела даних)
      const dataFromServer = {
        notifications: [
          { id: 1, message: 'New transaction: Deposit $100' },
          { id: 2, message: 'Payment received: $50' },
          // інші повідомлення...
        ],
      };

      // Оновлюємо стан контексту з отриманими даними
      setNotifications(dataFromServer.notifications);
    };

    // Викликаємо функцію отримання даних при завантаженні сторінки
    fetchData();
  }, []); // Порожній масив даних в залежності для виклику useEffect тільки один раз під час монтажу компонента

  return (
    <YourNotificationsContext.Provider value={{ notifications }}>
      {children}
    </YourNotificationsContext.Provider>
  );
};

export const useYourNotifications = () => {
  const context = useContext(YourNotificationsContext);
  if (!context) {
    throw new Error('useYourNotifications повинен використовуватися в межах YourNotificationsProvider');
  }
  return context;
};
