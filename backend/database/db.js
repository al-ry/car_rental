const connectPgSimple = require('connect-pg-simple')
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
    let data = [user.name, user.phone, user.email, user.idCity, user.password]
    let query = 'INSERT INTO \"user\" VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING id_user'
    let res = await this.#client.query(query, data)
    return res.rows[0].id_user
  }

  async getUserDataByPhone(phone) {
    let data = [phone]
    let query = 'SELECT id_user, phone, email, name, id_city, password FROM \"user\" WHERE phone = $1'
    let result = await this.#client.query(query, data)
    if (result.rowCount == 0) {
      throw new Error('Incorrect phone')
    }
    return result.rows[0]
  }

  async getUserIdByPhone(phone) { 
    let data = [phone]
    let query = 'SELECT id_user FROM \"user\" WHERE phone = $1'
    let result = await this.#client.query(query, data)
    return result.rows[0].id_user
  }

  async getCityNameById(id) {
    let data = [id]
    let query = 'SELECT name FROM city WHERE id_city = $1'
    let res = await this.#client.query(query, data)
    return res.rows[0]
  }
  async getCityIdByName(name) {
    console.log(name)
    let data = [name]
    let query = 'SELECT id_city FROM city WHERE name = $1'
    let res = await this.#client.query(query, data)
    return res.rows[0].id_city
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
    let result = await this.#client.query(query, data)
    return result.rows[0].id_mark
  }

  async findByEmail(email) {
    let data = [email]
    let query = 'SELECT email FROM \"user\" WHERE email = $1'
    let result = await this.#client.query(query, data)
    if (result.rowCount > 0) {
      throw new Error('Email already used')
    }
  }

  async getAdvertismentInfo(id) {
    let data = [id]
    let query = 'SELECT user_name, user_phone, cost, description, transmission, is_open, photo_path, fuel, year, body, mark, model, city FROM advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_city, name AS city FROM city) AS city ON city.id_city = advertisment.id_city ' +
                'INNER JOIN (SELECT id_mark, name AS mark FROM mark) AS mark  ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model FROM model) AS model ON car.id_model = model.id_model ' +
                'INNER JOIN (SELECT id_user, name AS user_name, phone AS user_phone FROM \"user\") AS \"user\" ON \"user\".id_user = advertisment.id_user ' +
                'WHERE advertisment.id_advertisment = $1'
    let res = await this.#client.query(query, data)
    return res.rows[0]
  }

  async getBookedDates(idAdvertisment) {
    let data = [idAdvertisment]
    let query = 'SELECT start, "end" FROM booking ' +
                'WHERE id_advertisment = $1 AND state = 1'
    let res = await this.#client.query(query, data)
    console.log(res)
    return res.rows
  }

  async getCarModelByName(modelName, markId) {
    let data = [markId, modelName]
    let query = 'SELECT id_model FROM model WHERE id_mark = $1 AND name = $2'
    let result = await this.#client.query(query, data)
    return result.rows[0].id_model
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
    let data = [car.markId, car.modelId, car.transmission, car.year, car.fuel, car.body]
    let query = 'INSERT INTO car VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id_car'
    let result = await this.#client.query(query, data)
    return result.rows[0].id_car
  }

  async getUserAdvertisments(userId) { 
    let data = [userId]
    let query = 'SELECT id_advertisment, cost, description, transmission, is_open, photo_path, fuel, year, body, mark, model, city FROM advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_city, name AS city FROM city) AS city ON city.id_city = advertisment.id_city ' +
                'INNER JOIN (SELECT id_mark, name AS mark FROM mark) AS mark  ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model FROM model) AS model ON car.id_model = model.id_model ' +
                'WHERE id_user = $1'
    let result = await this.#client.query(query, data)
    return result.rows
  }

  async getAdvetismentListPart(start, limit) {
    let data = [start, limit]
    let query = 'SELECT id_advertisment, cost, transmission, photo_path, fuel, year, body, mark, model, city FROM advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_city, name AS city FROM city) AS city ON city.id_city = advertisment.id_city ' +
                'INNER JOIN (SELECT id_mark, name AS mark FROM mark) AS mark  ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model FROM model) AS model ON car.id_model = model.id_model ' +
                'WHERE is_open = 1' +
                'ORDER BY id_advertisment DESC ' +
                'LIMIT $2 OFFSET $1'
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getIncomingRequests(idUser) {
    let data = [idUser] 
    console.log(data)
    let query = 'SELECT id_booking, booking.id_advertisment, state, renter_name, renter_phone, start, "end", mark_name, model_name FROM booking ' +
                'INNER JOIN (SELECT id_user AS id_renter, name AS renter_name, phone AS renter_phone FROM "user") AS renter ON renter.id_renter = booking.id_renter ' +
                'INNER JOIN advertisment ON advertisment.id_advertisment = booking.id_advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_mark, name AS mark_name FROM mark) AS mark ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model_name FROM model) AS model ON model.id_model = car.id_model ' +
                'WHERE advertisment.id_user = $1'
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getOutgoingRequests(idUser) {
    let data = [idUser] 
    console.log(data)
    let query = 'SELECT booking.id_advertisment, start, "end", mark_name, model_name FROM booking ' +
    'INNER JOIN advertisment ON advertisment.id_advertisment = booking.id_advertisment ' +
    'INNER JOIN car ON car.id_car = advertisment.id_car ' +
    'INNER JOIN (SELECT id_mark, name AS mark_name FROM mark) AS mark ON car.id_mark = mark.id_mark ' +
    'INNER JOIN (SELECT id_model, name AS model_name FROM model) AS model ON model.id_model = car.id_model ' +
    'WHERE booking.id_renter = $1 '
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getAdvertismentsCount() {
    let res = await this.#client.query('SELECT COUNT(is_open) as total_count FROM advertisment WHERE is_open = 1')
    return res.rows[0].total_count
  }

  async closeAdvertisment(id) {
    let data = [id]
    let query = 'UPDATE advertisment SET is_open = 0 WHERE id_advertisment = $1'
    await this.#client.query(query, data)
  }

  async reopenAdvertisment(id) {
    let data = [id]
    let query = 'UPDATE advertisment SET is_open = 1 WHERE id_advertisment = $1'
    await this.#client.query(query, data)
  }

  async insertAdvertisment(advrtsmnt) {
    let data = [advrtsmnt.idCar, advrtsmnt.idUser, advrtsmnt.idCity, advrtsmnt.cost, advrtsmnt.description, advrtsmnt.isOpen, advrtsmnt.photosPath]
    let query = 'INSERT INTO advertisment (id_advertisment, id_car, id_user, id_city, cost, description, is_open, photo_path) ' +
                'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)'
    await this.#client.query(query, data)
  }
  async insertCarBooking(booking) {
    let query = 'SELECT * FROM advertisment WHERE is_open = 1 AND id_advertisment = $1'
    let res = await this.#client.query(query, [booking.idAdvertisement])
    if (!res.rowCount) {
      throw new Error('Advertisment was closed by user')
    }
    // let data = [booking.idAdvertisement, booking.start, booking.end]
    // query = 'SELECT * FROM booking ' +
    //         'WHERE state = 1 AND ' +
    //               'id_advertisment = $1 AND ' + 
    //               '((start >= $2) AND (end <= $2)) AND )'
    // res = this.#client.query(query, data)
    let data = [booking.idAdvertisement, booking.idUser, booking.state, booking.start, booking.end]
    query = 'INSERT INTO booking VALUES (DEFAULT, $1, $2, $3, $4, $5)'
    await this.#client.query(query, data)
  }

  // async getBookingRequests(idUser) {
  //   let data = [idUser]
  //   let query = 'SELECT booking.id_advertisment, renter_name, renter_phone, start, "end", mark_name, model_name FROM booking ' +
  //               'INNER JOIN (SELECT id_user AS id_renter, name AS renter_name, phone AS renter_phone FROM "user") AS renter ON renter.id_renter = booking.id_renter ' +
  //               'INNER JOIN advertisment ON advertisment.id_advertisment = booking.id_advertisment ' +
  //               'INNER JOIN car ON car.id_car = advertisment.id_car ' +
  //               'INNER JOIN (SELECT id_mark, name AS mark_name FROM mark) AS mark ON car.id_mark = mark.id_mark ' +
  //               'INNER JOIN (SELECT id_model, name AS model_name FROM model) AS model ON model.id_model = car.id_model ' +
  //               'WHERE state = 0 AND advertisment.id_user = $1'
  //   res = await this.#client.query(query, data)
  //   console.log(res)
  //   return res.rows
  // }

  async acceptBooking(idBooking) {
    let data = [idBooking]
    let query = 'UPDATE booking SET state = 1 WHERE id_booking = $1 RETURNING id_booking'
    let res = await this.#client.query(query, data)
    if (!res.rowCount) {
      throw new Error('Incorrect booking identifier')
    }
  }

  async declineBooking(idBooking) {
    let data = [idBooking]
    let query = 'UPDATE booking SET state = 2 WHERE id_booking = $1 RETURNING id_booking'
    let res = await this.#client.query(query, data)
    if (!res.rowCount) {
      throw new Error('Incorrect booking identifier')
    }
  }

  async beginTransaction() {
    await this.#client.query('BEGIN')
  }

  async commitTransaction() {
    await this.#client.query('COMMIT')
  }

  async rollbackTransaction() {
    await this.#client.query('ROLLBACK')
  }

  async close() {
	   await this.#client.end()
  }
}

module.exports = {DBManager}