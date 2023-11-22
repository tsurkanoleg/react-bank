// Ваш компонент TransactionPage
import { useParams } from 'react-router-dom';

const TransactionPage = () => {
  // Використовуйте useParams для отримання параметрів з URL
  const { transactionId } = useParams();

  // Решта вашого коду...

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Transaction ID: {transactionId}</p>
      {/* Решта вмісту сторінки */}
    </div>
  );
};

export default TransactionPage;
















// import "./index.css";

// // TransactionPage.js
// import React from 'react';

// const TransactionPage = ({ params }) => {
//   const transactionId = params.transactionId; // Отримуємо id транзакції з параметрів URL

//   // тут ви можете використовувати transactionId для отримання даних про конкретну транзакцію з сервера

//   return (
//     <div>
//       <h2>Transaction Details</h2>
//       <p>Transaction ID: {transactionId}</p>
//       {/* Додайте інші деталі транзакції, які отримані з сервера */}
//     </div>
//   );
// };

// export default TransactionPage;
