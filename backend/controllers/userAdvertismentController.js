const { DBManager } = require('../database/db')
const fs = require('fs')
require('events').EventEmitter.defaultMaxListeners = Infinity;

exports.getAdvertisments = async (req, res) => {
    console.log(req.query)
    if (req.session) {
        db = new DBManager()
        try {
            await db.connect()
            let userId = await db.getUserIdByPhone(req.query.phone)
            let advertisments = await db.getUserAdvertisments(userId)
            await db.close()
            res.status(200).json(advertisments)
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    } else {
        res.status(400).json({err: "You have no permission"})
    }
}