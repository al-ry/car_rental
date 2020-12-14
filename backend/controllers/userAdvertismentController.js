const { DBManager } = require('../database/db')
const fs = require('fs')
const path = require('path');
require('dotenv').config()
exports.getAdvertisments = async (req, res) => {
    db = new DBManager()
    try {
        await db.connect()
        let advertisments = await db.getUserAdvertisments(req.session.user.id)
        let advertismentsWithAbsolutePaths = addAbsolutePathsToEachAdvertisments(advertisments)
        await db.close()
        res.status(200).json(advertismentsWithAbsolutePaths)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

function addAbsolutePathsToEachAdvertisments(advertisments) {
    advertisments.forEach(advrtsmnt => {
        const photosPath = path.join(__dirname, advrtsmnt.photo_path)
        console.log(photosPath)
        paths = getFilesPathsFromDirectory(photosPath)
        advrtsmnt.photo_path = paths
        
        console.log(advrtsmnt)
    })
    return advertisments
}

function getFilesPathsFromDirectory(path) {
    files = fs.readdirSync(path, {withFileTypes: true})
    paths = []
    files.forEach(elem => {
        paths.push(process.env.ADVERTISMENT_STORAGE + '\\' + elem.name)
    })
    return paths
}