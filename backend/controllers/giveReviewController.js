const { DBManager } = require('../database/db')

exports.addReview = async (req, res) => {
    let review = {
        idAdv: req.body.idAdvertisment,
        rate: req.body.rate,
        desc: req.body.description
    }
    try {
        db = new DBManager()
        await db.connect()
        await db.insertReview(review)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}