const connectPgSimple = require('connect-pg-simple')
const { DBManager } = require('../database/db')

exports.getIncomingBooking = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        rows = await db.getIncomingRequests(req.session.user.id)
        console.log(rows)
        await db.close()
        res.status(200).json(rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}