class User {
 
  static #list = []

  static #count = 1

  constructor({ email, password }) {
    this.id = User.#count++

    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
  }
 

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) => user.email === String(email).toLowerCase(),
      ) || null
    )
  }

	// ==========================
	static create(data) {
		const existUser = this.getByEmail(data.email);
	
		if (existUser) {
			// console.log("Користувач із цією електронною адресою вже існує.", ':path = back/class/user.js.30');
			return existUser;
		}
	
		const user = new User(data);
		this.#list.push(user);
	
		// console.log(this.#list, ':path = back/class/user.js,36');

		// console.log(user, ':path = back/class/user.js,38');

		return user;
	}  
}


module.exports = {
  User,
}

