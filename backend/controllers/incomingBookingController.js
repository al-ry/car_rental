const { DBManager } = require('../database/db')

exports.getIncomingBooking = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        console.log(req.session)
        rows = await db.getIncomingRequsets(req.session.user.id)
        await db.close()
        res.status(200).json(rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}