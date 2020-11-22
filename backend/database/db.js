const { Client } = require('pg')


export class DBManager {
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
  connect() {
    this.#client.connect(err => {
      if (err) {
        throw err
      }
    })
  }

  insertUser(user) {
    data = [user.name, user.phone, user.email, user.id_city, user.password]
    query = 'INSERT INTO user VALUES(DEFAULT, $1, $2, $3, $4, $5)'
    this.#client.query(query, data).catch(err => {
      if (err) throw err;
    })
  }

  close() {
    this.#client.end(err => {
      if (err) {
        throw err
      }
    })
  }
}


