const {DBManager} = require('../database/db')
const fs = require('fs')

exports.getInfo = async (req, res) => {
    db = new DBManager()
    try {
        await db.connect()
        advertisment = await db.getAdvertismentInfo(req.query.id)
        paths = getFilesPathsFromDirectory(advertisment.photo_path)
        advertisment.photo_path = paths
        console.log(advertisment)
        await db.close()
        res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(400).json({err: "Cannot get advertisment info"})
    }
} 


function getFilesPathsFromDirectory(path) {
    files = fs.readdirSync(path, {withFileTypes: true})
    paths = []
    files.forEach(elem => {
        paths.push(path + elem.name)
    })
    return paths
}