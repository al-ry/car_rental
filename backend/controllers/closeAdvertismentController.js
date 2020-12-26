const { DBManager } = require('../database/db')

exports.closeAdvertisment = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        await db.closeAdvertisment(req.body.id)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}