// SettingsPage.js
import React from 'react';
import SettingsForm from '../../component/SettingsForm';

const SettingsPage = () => {
  const handleSettingsChange = (newSettings) => {
    // Обробка нових налаштувань (наприклад, відправка на сервер)
    console.log('New settings:', newSettings);
  };

  return (
    <div>
      <h2>Settings Page</h2>
      <SettingsForm onSubmit={handleSettingsChange} />
      <button onClick={() => console.log('Logout')}>Logout</button>
    </div>
  );
};

export default SettingsPage;
