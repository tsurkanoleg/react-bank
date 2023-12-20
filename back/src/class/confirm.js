class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
		this.email = data.email;
  }

  static generateCode = () => Math.floor(Math.random() * 9000) + 1000

	static create = (data) => {
    const newConfirm = new Confirm(data);
    this.#list.push(newConfirm);

    setTimeout(() => {
			console.log('Before delete:', this.#list);
			Confirm.delete(newConfirm.code)
			console.log('After delete:', this.#list);
    }, 24 * 60 * 60 * 1000); // 24 години у мілісекундах

    console.log(this.#list, ':path = back/class/confirm.js,22');

    return newConfirm.code; 
  }

	static delete = (code) => {
		console.log('Before delete:', this.#list);
		const length = this.#list.length
	
		this.#list = this.#list.filter(
			(item) => item.code !== code,
		)
	
		console.log('After delete:', this.#list);
		return length > this.#list.length
	}
	

  static getData = (code) => {
		console.log('List contents:==============', this.#list);
    const obj = this.#list.find(
      (item) => item.code === code,
    )

		console.log(obj, ':path = back/class/confirm.js,46')

		return (
			obj ? obj.email : null
		); 
  }
}

module.exports = {
  Confirm,
}
