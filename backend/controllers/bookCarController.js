const {DBManager} = require('../database/db')

exports.bookCar = async (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
}