const {DBManager} = require('../database/db')

exports.getList = async (req, res) => {
    results = req.results
    if (req.query.filters) {
        filters = JSON.parse(req.query.filters)
    } else {
        req.query.filters = {}
    }
    db = new DBManager()
    try {
        await db.connect()
        pagesCount = await db.getAdvertismentsCount(filters)
        results.rows  = await db.getAdvetismentListPart(results.current.startPos, results.current.limit, filters)
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
    })
    return advertisments
}

function getFirstImageFromFolder(relativePath) {
    const absolutePath = path.join(__dirname, process.env.ADVERTISMENT_STORAGE, relativePath)
    files = fs.readdirSync(absolutePath, {withFileTypes: true})
    return (relativePath + '/' + files[0].name)
}