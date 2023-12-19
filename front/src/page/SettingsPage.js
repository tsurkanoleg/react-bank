import React, { useState } from 'react';

const SettingsPage = () => {
  // State для збереження даних користувача або налаштувань
  const [userSettings, setUserSettings] = useState({
    // Додайте тут поля налаштувань, наприклад:
    // email: 'JohnDoe',
    // email: 'john.doe@example.com',
    // інші налаштування...
  });

  // Обробник зміни введених значень у формі
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Оновлення стану змінених налаштувань
    setUserSettings({
      ...userSettings,
      [name]: value,
    });
  };

  // Обробник відправки форми (може бути доданий при необхідності)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Додайте логіку відправки налаштувань на сервер або локального збереження
    // Наприклад, використовуйте API для оновлення даних користувача
  };

  return (
    <div>
      <h2>Settings</h2>
      {/* Форма для відображення та редагування налаштувань */}
      <form onSubmit={handleSubmit}>
        {/* Приклад поля для редагування email */}
        <label>
          Username:
          <input
            type="text"
            name="email"
            value={userSettings.email || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Приклад поля для редагування email */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userSettings.email || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Додайте інші поля налаштувань за необхідності */}
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;
