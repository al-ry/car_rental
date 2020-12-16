const { DBManager } = require('../database/db')

exports.decline = async (req, res) => {
    idBooking = req.body.idBooking
    try {
        db = new DBManager()
        await db.connect()
        await db.declineBooking(idBooking)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}