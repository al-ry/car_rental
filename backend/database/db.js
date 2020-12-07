const { Client } = require('pg')
require('dotenv').config()

class DBManager {
  #client

  constructor() {
	this.#client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
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

  async getUserDataByPhone(phone) {
    let data = [phone]
    let query = 'SELECT phone, email, name, id_city, password FROM \"user\" WHERE phone = $1'
    let result = await this.#client.query(query, data)
    if (result.rowCount == 0) {
      throw new Error('Incorrect phone')
    }
    return result.rows[0]
  }
  async getCityNameById(id) {
    let data = [id]
    let query = 'SELECT name FROM city WHERE id_city = $1'
    let res = await this.#client.query(query, data)
    return res.rows[0]
  }

  async getMarkModels(markName) {
    let data = [markName]
    let query = 'SELECT id_mark FROM mark WHERE name = $1'
    let carId = await this.#client.query(query, data)
    query = 'SELECT name FROM model WHERE id_mark = $1'
    return await this.#client.query(query, [carId.rows[0].id_mark])
  }

  async getCarIdByName(markName) {
    let data = [markName]
    let query = 'SELECT id_mark FROM mark WHERE name = $1'
    return await this.#client.query(query, data)
  }

  async findByEmail(email) {
    let data = [email]
    let query = 'SELECT email FROM \"user\" WHERE email = $1'
    let result = await this.#client.query(query, data)
    if (result.rowCount > 0) {
      throw new Error('Email already used')
    }
  }
  
  async findByPhone(phone) {
    let data = [phone]
    let query = 'SELECT phone FROM \"user\" WHERE phone = $1'
    let result = await this.#client.query(query, data)
    if (result.rowCount > 0) {
      throw new Error('Phone already used')
    }
  }
  
  async getCarsList() {
    let query = 'SELECT name FROM mark'
    return await this.#client.query(query)
  }

  async insertCities(cities) {
    for (let city of Object.values(cities)) {
      let data = [city.city]
      let query = 'INSERT INTO city VALUES (DEFAULT, $1)'
      await this.#client.query(query, data)
    }
  }

  async getCities() {
    let query = 'SELECT name FROM city'
    return await this.#client.query(query)
  }

  async insertCar(car) {
    let data = [car.mark]
    let query = 'INSERT INTO car VALUES (DEFAULT, $1, $2, $3, $4, $5)'
  }

  async close() {
	   await this.#client.end()
  }
}


module.exports = {DBManager}