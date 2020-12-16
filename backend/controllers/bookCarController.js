const {DBManager} = require('../database/db')

exports.bookCar = async (req, res) => {
    let data = req.body           
    const db = new DBManager()
    console.log(req.session)
    const bookingData = {
        start: data.start,
        end: data.end,
        idAdvertisment: data.idAdvertisment,
        idUser: req.session.user.id,
        isAccepted: 0
    }
    try {
        db.connect()
        await db.insertCarBooking(bookingData)
        db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}