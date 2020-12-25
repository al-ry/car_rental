const { DBManager } = require('../database/db')
const { EditingError } = require('../errors/authorizationErrors')
const {getFilesPathsFromDirectory} = require('../utils/filesUtil');
const fs = require('fs');
const path = require('path');
const { ERANGE } = require('constants');

exports.edit = async (req, res) => {
    let newCarInfo = {
        idAdv: req.body.idAdvertisment,
        cost: req.body.cost,
        description: req.body.desctiption,
        fuel: req.body.fuel,
        year: req.body.year,
        city: req.body.city,
        body: req.body.body,
        transmission: req.body.transmission
    }
    try {
        db = new DBManager()
        await db.connect()
        await db.updateAdvertismentInfo(newCarInfo)
        await db.close()
        deletePhotosFromFolder(JSON.parse(req.body.deletedPhotos))
        res.sendStatus(200)
    } catch (err) {
        console.log(req.files)
        deleteNewFilesOnError(req.files)
        res.sendStatus(400)
    }
}

exports.getInfoForEditing = async (req, res) => {
    console.log(req.session.user.id)
    console.log(req.query.idAdvertisment)
    let data = {
        idAdv : req.query.idAdvertisment,
        idUser : req.session.user.id
    }
    try {
        db = new DBManager()
        await db.connect()
        let info = await db.getAdvertismentInfoForEditing(data)
        paths = getFilesPathsFromDirectory(info.photo_path)
        info.photo_path = paths
        await db.close()
        res.status(200).json(info)
    } catch (err) {
        if (err instanceof EditingError) {
            res.status(404).json({err: err.message})
        } else {
            res.sendStatus(400)
        }
    }
}


function deletePhotosFromFolder(arrayOfPhotosNames) {
    console.log(arrayOfPhotosNames)
    arrayOfPhotosNames.forEach(relativePath => {
        const absolutePath = path.join(__dirname, process.env.ADVERTISMENT_STORAGE, relativePath)
        fs.unlink(absolutePath, function(err) {
            if (err) {
              throw err
            }
          })
    })
}


function deleteNewFilesOnError(arrayOfNewPhotos) {
    arrayOfNewPhotos.forEach(elem => {
        fs.unlink(elem.path, function(err) {
            if (err) {
              throw err
            }
          })
    })
}