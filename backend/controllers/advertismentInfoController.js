const {DBManager} = require('../database/db')
const fs = require('fs')
const path = require('path');
const {getFilesPathsFromDirectory} = require('../utils/filesUtil')

exports.getInfo = async (req, res) => {
    db = new DBManager()
    try {
        await db.connect()
        advertisment = await db.getAdvertismentInfo(req.query.id)
        console.log(advertisment)
        paths = getFilesPathsFromDirectory(advertisment.photo_path)
        advertisment.photo_path = paths
        console.log(advertisment)
        await db.close()
        res.status(200).json(advertisment)
    } catch (err) {
        console.log(err)
        res.status(400).json({err: "Cannot get advertisment info"})
    }
} 
