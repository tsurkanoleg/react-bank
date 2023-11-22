import "./index.css";

// BalanceTopUpForm.js
import React, { useState } from 'react';

const BalanceTopUpForm = ({ onTopUp }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleTopUp = () => {
    // Валідація та відправка запиту на поповнення балансу
    if (amount && paymentMethod) {
      onTopUp({ amount, paymentMethod });
      // Очищення полів після поповнення балансу
      setAmount('');
      setPaymentMethod('');
    } else {
      // Обробка помилок валідації
      console.error('Please enter amount and select a payment method.');
    }
  };

  return (
    <div>
      <h3>Top Up Balance</h3>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Payment Method:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
      <br />
      <button onClick={handleTopUp}>Top Up</button>
    </div>
  );
};

export default BalanceTopUpForm;
