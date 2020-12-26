const connectPgSimple = require('connect-pg-simple')
const { query } = require('express')
const { Client } = require('pg')
const { BookingError, AuthorizationError, RegistrationError, EditingError } = require('../errors/authorizationErrors')
require('dotenv').config()
const advFilters = require('./filters')

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
    await this.findByEmail(user.phone)
    await this.findByPhone(user.phone)
    let data = [user.name, user.phone, user.email, user.idCity, user.password]
    let query = 'INSERT INTO \"user\" VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING id_user, phone, email, name, id_city'
    let res = await this.#client.query(query, data)
    return res.rows[0]
  }

  async getUserDataByPhone(phone) {
    let data = [phone]
    let query = 'SELECT id_user, phone, email, name, id_city, password FROM \"user\" WHERE phone = $1'
    let result = await this.#client.query(query, data)
    if (result.rowCount == 0) {
      throw new AuthorizationError('Incorrect phone')
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
    return res.rows[0].name
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
      throw new RegistrationError('Email already used')
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
      throw new RegistrationError('Phone already used')
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

  async getAdvetismentListPart(start, limit, filters) {
    let data = [start, limit]
    console.log(filters)
    let query = 'SELECT advertisment.id_advertisment, cost, transmission, photo_path, fuel, year, body, mark, model, city FROM advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_city, name AS city FROM city) AS city ON city.id_city = advertisment.id_city ' +
                'INNER JOIN (SELECT id_mark, name AS mark FROM mark) AS mark  ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model FROM model) AS model ON car.id_model = model.id_model ' +
                advFilters.ApplyDateFilter(filtres.dateRange)
                'WHERE is_open = 1 ' + advFilters.ApplyTransmissionFilter(filters.transmission) +
                                       advFilters.ApplyCityFilter(filters.city) +
                                       advFilters.ApplyCostFilter(filters.cost) +
                                       advFilters.ApplyBodyFilter(filters.body) + 
                                       advFilters.ApplyCostSort(filters.sortByCostASC, filters.sortByCostDESC) + 
                'LIMIT $2 OFFSET $1'
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getIncomingRequests(idUser) {
    let data = [idUser] 
    let query = 'SELECT id_booking, booking.id_advertisment, state, renter_name, renter_phone, start, "end", mark_name, model_name FROM booking ' +
                'INNER JOIN (SELECT id_user AS id_renter, name AS renter_name, phone AS renter_phone FROM "user") AS renter ON renter.id_renter = booking.id_renter ' +
                'INNER JOIN advertisment ON advertisment.id_advertisment = booking.id_advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_mark, name AS mark_name FROM mark) AS mark ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model_name FROM model) AS model ON model.id_model = car.id_model ' +
                'WHERE advertisment.id_user = $1 ' +
                'ORDER BY state ASC'
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getUserReviewsByPhone(phone) {
    let data = [phone]
    let id = await this.getUserIdByPhone(phone)
    data = [id]
    let query = 'SELECT reviewer_name, reviewer_phone, rating, description FROM review ' +
                'INNER JOIN (SELECT id_user AS id_reviewer, name as reviewer_name, phone AS reviewer_phone FROM "user") AS reviewer ' +
                'ON reviewer.id_reviewer = review.id_reviewer ' +
                'WHERE id_user = $1'
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getUserRating(idAdv) {
    let data = [idAdv]
    let query = 'SELECT rating FROM review ' +
                'INNER JOIN advertisment ON advertisment.id_user = review.id_user ' +
                'WHERE id_advertisment = $1'
    let res = await this.#client.query(query, data)
    return res.rows
  }


  async getOutgoingRequests(idUser) {
    let data = [idUser] 
    let query = 'SELECT booking.id_advertisment, state, start, "end", mark_name, model_name FROM booking ' +
                'INNER JOIN advertisment ON advertisment.id_advertisment = booking.id_advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_mark, name AS mark_name FROM mark) AS mark ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model_name FROM model) AS model ON model.id_model = car.id_model ' +
                'WHERE booking.id_renter = $1 ' + 
                'ORDER BY state ASC'
    let res = await this.#client.query(query, data)
    return res.rows
  }

  async getAdvertismentsCount(filters) {
    let query = 'SELECT advertisment.id_advertisment, cost, transmission, photo_path, fuel, year, body, mark, model, city FROM advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_city, name AS city FROM city) AS city ON city.id_city = advertisment.id_city ' +
                'INNER JOIN (SELECT id_mark, name AS mark FROM mark) AS mark  ON car.id_mark = mark.id_mark ' +
                'INNER JOIN (SELECT id_model, name AS model FROM model) AS model ON car.id_model = model.id_model ' +
                advFilters.ApplyDateFilter(filters.dateRange) +
                'WHERE is_open = 1 ' + advFilters.ApplyTransmissionFilter(filters.transmission) +
                                       advFilters.ApplyCityFilter(filters.city) +
                                       advFilters.ApplyCostFilter(filters.cost) +
                                       advFilters.ApplyBodyFilter(filters.body)
    let res = await this.#client.query(query)
    return res.rowCount
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
      throw new BookingError('Advertisment was closed by user')
    }
    let data = [booking.idAdvertisement, booking.start, booking.end]
    query = 'SELECT * FROM booking ' +
            'WHERE state = 1 AND ' +
            'id_advertisment = $1 AND ' +
            '( ' +
            '((start <= $2 AND "end" >= $2) OR (start <= $3  AND "end" >= $3)) OR ' +
            '(((start >= $2) AND ' +'("end" <= $3))) ' +
            ')'
    res = await this.#client.query(query, data)
    if (res.rowCount > 0) {
      throw new BookingError('Date already booked')
    }
    data = [booking.idAdvertisement, booking.idUser, booking.state, booking.start, booking.end]
    query = 'INSERT INTO booking VALUES (DEFAULT, $1, $2, $3, $4, $5)'
    await this.#client.query(query, data)
  }

  async acceptBooking(idBooking) {
    let data = [idBooking]
    let query = 'UPDATE booking SET state = 1 WHERE id_booking = $1 RETURNING id_booking'
    let res = await this.#client.query(query, data)
    if (!res.rowCount) {
      throw new BookingError('Incorrect booking identifier')
    }
  }

  async updateAdvertismentInfo(info) {
    let city = await this.#client.query('SELECT id_city FROM city WHERE name = $1', [info.city])
    let car = await this.#client.query('SELECT id_car FROM advertisment WHERE id_advertisment = $1', [info.idAdv])
    let data = [info.transmission, info.year, info.fuel, info.body, car.rows[0].id_car]
    await this.#client.query('UPDATE car SET transmission = $1, year = $2, fuel = $3, body = $4 WHERE id_car = $5', data)
    data = [info.idAdv, info.cost, info.description, city.rows[0].id_city]
    let query = 'UPDATE advertisment SET cost = $2, description = $3, id_city = $4 WHERE id_advertisment = $1'
    await this.#client.query(query, data)
  }

  async getAdvertismentInfoForEditing(info) {
    let data = [info.idAdv, info.idUser]
    console.log(data)
    let query = 'SELECT cost, description, transmission, photo_path, fuel, year, body, city FROM advertisment ' +
                'INNER JOIN car ON car.id_car = advertisment.id_car ' +
                'INNER JOIN (SELECT id_city, name AS city FROM city) AS city ON city.id_city = advertisment.id_city ' +
                'WHERE advertisment.id_advertisment = $1 AND id_user = $2'
    let res = await this.#client.query(query, data)
    console.log(res.rows)
    if (res.rowCount == 0) {
      throw new EditingError('Advertisment not found')
    }
    return res.rows[0]
  }

  async insertReview(rev) {
    let data = [rev.idAdv, rev.idUser, rev.rate, rev.desc]
    let query = 'INSERT INTO review VALUES ' +
                '(DEFAULT, ' + 
                '(SELECT id_user FROM advertisment WHERE id_advertisment = $1), ' +
                '$2, $3, $4)'
    await this.#client.query(query, data)
  }

  async declineBooking(idBooking) {
    let data = [idBooking]
    let query = 'UPDATE booking SET state = 2 WHERE id_booking = $1 RETURNING id_booking'
    let res = await this.#client.query(query, data)
    if (!res.rowCount) {
      throw new BookingError('Incorrect booking identifier')
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