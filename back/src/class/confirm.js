class Confirm {
  static #list = []

  constructor(data) {
    this.code = Number(Confirm.generateCode())
    this.data = data
  }

  static generateCode = () => Math.floor(Math.random() * 9000) + 1000

  static create = (data) => {
		const confirmation = new Confirm(data);
		this.#list.push(confirmation);	

    setTimeout(() => {
      this.delete(code)
    }, 24 * 60 * 60 * 1000) // 24 години у мілісекундах

    console.log(confirmation.code, ':path = back/class/confirm.js,19')

		return confirmation.code;
  }

  static delete = (code) => {
		const length = this.#list.length

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length
  }

 
  static getData = (code) => {		
    const obj = this.#list.find(
      (item) => item.code === code,
    )

    return obj ? obj.data : null
  }
}

module.exports = {
  Confirm,
}











