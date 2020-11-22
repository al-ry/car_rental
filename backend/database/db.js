const { Client } = require('pg')


class DBManager {
  #client

  constructor() {
    this.#client = new Client({
      user: 'postgres',
      password: 'postgres',
      database: 'car_rental',
      host: 'localhost',
      port: 5432
    })
  }
  async connect() {
    await this.#client.connect()
  }

  async insertUser(user) {
    console.log(user)
    let data = [user.name, user.phone, user.email, user.idCity, user.password]
    let query = 'INSERT INTO \"user\" VALUES(DEFAULT, $1, $2, $3, $4, $5)'
    await this.#client.query(query, data)
  }
  async getPasswordByPhone(phone) {
    let data = [phone]
    let query = 'SELECT password FROM \"user\" WHERE phone = $1'
    return await this.#client.query(query, data)
  }

  async close() {
	   await this.#client.end()
  }
}


module.exports =  {DBManager}