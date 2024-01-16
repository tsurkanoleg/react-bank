class Bank {
  static #list = [];

  static create(user) {
    const bankAccount = new BankAccount(user);
    this.#list.push(bankAccount);
    return bankAccount;
  }

  // Метод для отримання екземпляру BankAccount за допомогою користувача
  static getAccountByUser(user) {
    return this.#list.find(account => account.accountUser === user);
  }
}

class BankAccount {
  #transactions = [];
	#transactionIdCounter = 1;
	
  constructor(accountUser, initialBalance = 0) {
    this.accountUser = accountUser;
    this.balance = initialBalance;
  }

	// Метод для оновлення електронної пошти облікового запису
	updateEmail(newEmail) {
		this.accountUser = newEmail;
		this.#transactions.forEach(transaction => {
			if (transaction.email === this.accountUser) {
				transaction.email = newEmail;
			}
		});
	
		return this;
	}

	 // Метод для отримання поточного балансу
	 getBalance() {
    return this.balance;
  }

  // Метод для отримання історії транзакцій
  getTransactionHistory() {
    return this.#transactions;
  }

	// Метод для отримання транзакції по id
	getTransactionById(transactionId) {
		return this.#transactions.find(transaction => transaction.id === transactionId);
	}



	receive(amount, paymentSystem) {
    if (amount > 0) {
      const transaction = {
        id: this.#transactionIdCounter++,
        type: 'Receive',
        amount,
        paymentSystem,
        time: new Date(),
      };

      this.balance += amount;
      this.#transactions.push(transaction);

      return transaction.id;
    } else {
      console.error('Недійсна сума отримання.');
      return null;
    }
  }


	send(amount, email) {
    if (amount > 0 && amount <= this.balance) {
      const transaction = {
        id: this.#transactionIdCounter++,
        type: 'Send',
        amount,
        email,
        time: new Date(),
      };

      this.balance -= amount;
      this.#transactions.push(transaction);

      return transaction.id;
    } else {
      console.error('Недійсна сума відправлення або недостатньо коштів.');
      return null;
    }
  }
}

module.exports = {
  Bank,
  BankAccount,
};
