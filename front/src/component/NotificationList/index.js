import "./index.css";

// NotificationList.js
import React from 'react';

const NotificationList = ({ notifications }) => {
  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
