const {DBManager} = require('../database/db')
const fs = require('fs')
const path = require('path');
const {getFilesPathsFromDirectory} = require('../utils/filesUtil');
const advertismentInfoRouter = require('../routes/advertismentInfoRouter');

exports.getInfo = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        advertisment = await db.getAdvertismentInfo(req.query.id)
        userRating = await db.getUserRating(req.query.id)
        console.log(userRating)
        await db.close()
        paths = getFilesPathsFromDirectory(advertisment.photo_path)
        advertisment.photo_path = paths
        advertisment.rating = userRating
        console.log(advertisment)
        res.status(200).json(advertisment)
    } catch (err) {
        console.log(err)
        res.status(400).json({err: "Cannot get advertisment info"})
    }
} 
