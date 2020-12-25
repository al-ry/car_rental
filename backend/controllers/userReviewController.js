const { DBManager } = require('../database/db')
require('dotenv').config()

exports.getReviews = async (req, res) => {
    var phone = req.query.phone
    db = new DBManager()
    try {
        await db.connect()
        let reviews = await db.getUserReviewsByPhone(phone)
        await db.close()
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}