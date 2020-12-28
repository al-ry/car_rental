const { DBManager } = require('../database/db')
require('dotenv').config()

exports.getReviews = async (req, res) => {
    var phone = req.query.phone
    const db = new DBManager()
    try {
        await db.connect()
        let reviews = await db.getUserReviewsByPhone(phone)
        let userName = await db.getUserNameByPhone(phone)
        await db.close()
        console.log(reviews)
        res.status(200).json({
            reviews: reviews,
            userName: userName
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}