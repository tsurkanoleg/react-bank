// BalanceTopUpPage.js
import React from 'react';
import BalanceTopUpForm from '../../component/BalanceTopUpForm';

const BalanceTopUpPage = () => {
  const handleTopUp = (data) => {
    // Обробник події поповнення балансу, тут ви можете викликати API для здійснення транзакції
    console.log('Top Up Request:', data);
  };

  return (
    <div>
      <h2>Balance Top Up</h2>
      <BalanceTopUpForm onTopUp={handleTopUp} />
    </div>
  );
};

export default BalanceTopUpPage;
