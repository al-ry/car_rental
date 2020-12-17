const { DBManager } = require('../database/db')

exports.getOutgoingBooking = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        rows = await db.getOutgoingRequests(req.session.user.id)
        console.log(rows)
        await db.close()
        res.status(200).json(rows)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}