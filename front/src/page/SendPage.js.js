// SendPage.js
import React from 'react';
import TransferForm from '../component/TransferForm';

const SendPage = () => {
  const handleTransfer = (transferData) => {
    // Обробка даних про переказ (наприклад, відправка на сервер)
    console.log('Transfer details:', transferData);
  };

  return (
    <div>
      <h2>Send Money</h2>
      <TransferForm onSubmit={handleTransfer} />
    </div>
  );
};

export default SendPage;
