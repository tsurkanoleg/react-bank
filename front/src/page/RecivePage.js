// RecivePage.js
import React, { useState } from 'react';

const RecivePage = () => {
  // State для збереження даних форми
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');

  // Обробник зміни введених значень в формі
  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Обробник відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();
    // Додайте логіку відправлення грошей або переказу тут, використовуючи recipientEmail та amount
    console.log('Recipient Email:', recipientEmail);
    console.log('Amount:', amount);
  };

  return (
    <div>
      <h2>Recive Money</h2>
      {/* Форма для відправлення грошей або переказу */}
      <form onSubmit={handleSubmit}>
        <label>
          Recipient Email:
          <input
            type="email"
            value={recipientEmail}
            onChange={handleRecipientEmailChange}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </label>
        <br />
        <button type="submit">Recive Money</button>
      </form>
    </div>
  );
};

export default RecivePage;
