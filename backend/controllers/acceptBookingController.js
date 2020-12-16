const { DBManager } = require('../database/db')

exports.accept = async (req, res) => {
    db = new DBManager()
    console.log(req.body.idBooking)
    try {
        await db.connect()
        await db.acceptBooking(req.body.idBooking)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}