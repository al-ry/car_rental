const {DBManager} = require('../database/db')
const { BookingError } = require('../errors/authorizationErrors')

//TODO: should add checking for if already booked 
//      check is advertisment open

exports.bookCar = async (req, res) => {
    let data = req.body         
    const db = new DBManager()
    const bookingData = {
        start: data.start,
        end: data.end,
        idAdvertisement: data.idAdvertisement,
        idUser: req.session.user.id,
        state: 0
    }
    try {
        db.connect()
        await db.insertCarBooking(bookingData)
        db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        if (err instanceof BookingError) {
            res.status(400).json({err: err.message})
        }
        res.status(400).json({err: "Unexpected error"})
    }
}