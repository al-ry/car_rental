const { DBManager } = require('../database/db')
const { EditingError } = require('../errors/authorizationErrors')
const {getFilesPathsFromDirectory} = require('../utils/filesUtil');

exports.edit = async (req, res) => {
    console.log('editing..')
    try {
        db = new DBManager()
        await db.connect()
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
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