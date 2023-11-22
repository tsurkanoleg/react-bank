// NotificationsPage.js
import React from 'react';
import { useYourNotifications } from './NotificationsPage';

const NotificationsPage = () => {
  // Отримуємо дані повідомлень з контексту
  const { notifications } = useYourNotifications();

  return (
    <div>
      <h2>Notifications</h2>
      {/* Вивід повідомлень */}
      <ul>
        {notifications.map((notification) => (
          // Кожне повідомлення представлено як елемент списку
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
