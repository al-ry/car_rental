const { DBManager } = require('../database/db')
require('dotenv').config()
const {addPhotosPathsToEachAdvertisments} = require('../utils/filesUtil')

exports.getAdvertisments = async (req, res) => {
    db = new DBManager()
    try {
        await db.connect()
        let advertisments = await db.getUserAdvertisments(req.session.user.id)
        let advertismentsWithAbsolutePaths = addPhotosPathsToEachAdvertisments(advertisments)
        await db.close()
        res.status(200).json(advertismentsWithAbsolutePaths)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}
