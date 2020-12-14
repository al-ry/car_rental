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
        paths = getFilesPathsFromDirectory(advrtsmnt.photo_path)
        advrtsmnt.photo_path = paths
        
        console.log(advrtsmnt)
    })
    return advertisments
}

function getFilesPathsFromDirectory(relativePath) {
    const absolutePath = path.join(__dirname, relativePath)
    files = fs.readdirSync(absolutePath, {withFileTypes: true})
    paths = []
    console.log(files)
    files.forEach(elem => {
        paths.push(relativePath + '\\' + elem.name)
    })
    return paths
}