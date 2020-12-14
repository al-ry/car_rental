const { DBManager } = require('../database/db')

exports.reopenAdvertisment = async (req, res) => {
    try {
        db = new DBManager()
        await db.connect()
        await db.closeAdvertisment(req.body.id)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}