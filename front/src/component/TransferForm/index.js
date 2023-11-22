import "./index.css";

// TransferForm.js
import React, { useState } from 'react';

const TransferForm = ({ onSubmit }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Відправте дані про переказ на сервер або обробіть їх за необхідністю
    onSubmit({ recipientEmail, amount });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recipient Email:
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Send Money</button>
    </form>
  );
};

export default TransferForm;
