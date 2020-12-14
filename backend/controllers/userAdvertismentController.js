const { DBManager } = require('../database/db')
const fs = require('fs')
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

function getFilesPathsFromDirectory(path) {
    files = fs.readdirSync(path, {withFileTypes: true})
    paths = []
    files.forEach(elem => {
        paths.push(path + elem.name)
    })
    return paths
}