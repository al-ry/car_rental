const { DBManager } = require('../database/db')

exports.getAdvertisments = async (req, res) => {
    console.log(req.query)
    if (req.session) {
        db = new DBManager()
        try {
            await db.connect()
            let userId = await db.getUserIdByPhone(req.query.phone)
            let advertisments = await db.getUserAdvertisments(userId)
            console.log(advertisments)
            await db.close()
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    } else {
        res.status(400).json({err: "You have no permission"})
    }
}