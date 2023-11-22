import React, { useState, useEffect } from 'react';

const BalancePage = () => {
  // State для збереження даних балансу та транзакцій
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Моделюємо отримання даних балансу та транзакцій (приклад)
  useEffect(() => {
    // Симуляція отримання даних з сервера або іншого джерела
    const fetchData = async () => {
      // Приклад даних з сервера (може змінюватися в залежності від реального джерела даних)
      const dataFromServer = {
        balance: 1000,
        transactions: [
          { id: 1, description: 'Purchase 1', amount: -50 },
          { id: 2, description: 'Deposit', amount: 200 },
          // інші транзакції...
        ],
      };

      // Оновлюємо стан компонента з отриманими даними
      setBalance(dataFromServer.balance);
      setTransactions(dataFromServer.transactions);
    };

    // Викликаємо функцію отримання даних при завантаженні сторінки
    fetchData();
  }, []); // Порожній масив даних в залежності для виклику useEffect тільки один раз під час монтажу компонента

  return (
    <div>
      <h2>Your Balance</h2>
      {/* Вивід балансу */}
      <p>Current Balance: ${balance}</p>

      {/* Вивід транзакцій */}
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BalancePage;
