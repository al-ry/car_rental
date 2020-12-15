const {DBManager} = require('../database/db')

exports.getList = async (req, res) => {
    results = req.results
    console.log(results)
    db = new DBManager()
    try {
        await db.connect()
        pagesCount = await db.getAdvertismentsCount()
        results.rows  = await db.getAdvetismentListPart(results.current.startPos, results.current.endPos)
        results.rows.photo_path = addPhotoPathToEachAdvertisments(results.rows)
        await db.close()
        pagesCountInt = parseInt(pagesCount)
        results.pagesCount = calculatePagesCount(pagesCountInt, results.current.limit)
        res.status(200).json(results)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
}

function calculatePagesCount(totalCount, limit) {
    return Math.ceil(totalCount / limit)
}

const fs = require('fs')
const path = require('path');

function addPhotoPathToEachAdvertisments(advertisments) {
    advertisments.forEach(advrtsmnt => {
        paths = getFirstImageFromFolder(advrtsmnt.photo_path)
        advrtsmnt.photo_path = paths
        
        console.log(advrtsmnt)
    })
    return advertisments
}

function getFirstImageFromFolder(relativePath) {
    const absolutePath = path.join(__dirname, process.env.ADVERTISMENT_STORAGE, relativePath)
    console.log(absolutePath)
    files = fs.readdirSync(absolutePath, {withFileTypes: true})
    return (relativePath + '/' + files[0].name)
}