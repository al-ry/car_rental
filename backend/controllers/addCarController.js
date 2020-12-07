const { nanoid } = require('nanoid')

const {DBManager} = require('../database/db')


exports.addCar = (req, res) => {
    const car = req.body
    const file = req.files
    try {
        db = new DBManager()
        db.connect()
    } catch (err) {

    }
    res.sendStatus(200)
}