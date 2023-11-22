import "./index.css";

// SettingsForm.js
import React, { useState } from 'react';

const SettingsForm = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Відправте нові дані на сервер або обробіть їх за необхідністю
    onSubmit({ newPassword, newEmail });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        New Email:
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default SettingsForm;
