// Клас для системи нотифікацій
class Notification {
  static #list = [];

  // Статичний метод для створення нового облікового запису нотифікацій
  static create(user) {
    const notificationAccount = new NotificationAccount(user);
    this.#list.push(notificationAccount);
    return notificationAccount;
  }

  // Статичний метод для отримання облікового запису нотифікацій за користувачем
  static getNotificationByUser(user) {
    return this.#list.find(account => account.user === user);
  }
}

// Клас для облікового запису нотифікацій
class NotificationAccount {
  // Приватні поля для зберігання історії нотифікацій та лічильника
  #notifications = [];
  #notificationIdCounter = 0;

	// Конструктор класу, приймає користувача та ініціалізує обліковий запис
	constructor(user) {
		this.user = user;
	}

	// Метод для оновлення пошти нотифікацій користувача
	updateEmail(newEmail) {
		this.user = newEmail;
		this.#notifications.forEach(notification => {
			if (notification.email === this.user) {
				notification.email = newEmail;
			}
		});
	
		return this;
	}


  // Метод для додавання нотифікації до історії
  addNotification(message, type) {
    const notification = {
      id: this.#notificationIdCounter++,
      message,
      time: new Date(),
      type,
    };
    this.#notifications.push(notification); 		
		// console.log(notification, 'path:back/class/notif...45')
		
		return notification
  }

  // Метод для отримання історії нотифікацій
  getNotificationHistory() {
		// console.log(this.#notifications, '=====notifications+++++')
    return this.#notifications;
		
  }
}

// Експортуємо класи для використання в інших частинах програми
module.exports = {
  Notification,
  NotificationAccount,
};
