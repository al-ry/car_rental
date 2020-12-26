const { DBManager } = require('../database/db')

exports.reopenAdvertisment = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        await db.reopenAdvertisment(req.body.id)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}