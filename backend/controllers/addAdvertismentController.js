const { nanoid } = require('nanoid')
const {DBManager} = require('../database/db')
const fs = require('fs')
require('dotenv').config()
const path = require('path');
const {uploadAdvertisment} = require('../config/multerStorageConfig')

uploadAdvertisment.array('files', 6)

exports.addAdvertisment = async (req, res) => {
    console.log(req.body)
    const advrtsmnt = req.body
    const photosPath = path.join(__dirname, process.env.ADVERTISMENT_STORAGE, req.body.uid)
    db = new DBManager()
    try {
        await db.connect()
        await db.beginTransaction()
        markId = await db.getCarIdByName(req.body.mark)
        modelId = await db.getCarModelByName(req.body.model, markId)
        let newCar = CreateCar(markId, modelId, advrtsmnt.transmission, advrtsmnt.year, advrtsmnt.fuel, advrtsmnt.body)
        let idCar = await db.insertCar(newCar)
        let idUser = await db.getUserIdByPhone(req.body.phone)
        let idCity = await db.getCityIdByName(advrtsmnt.city)
        let advertisment = CreateAdvertisment(idCar, idUser, idCity, advrtsmnt.cost, advrtsmnt.description, photosPath)
        await db.insertAdvertisment(advertisment)
        await db.commitTransaction()
        res.sendStatus(200)
    } catch (err) {
        fs.rmdirSync(photosPath, { recursive: true }, (err) => {
            console.log(err)
        })
        await db.rollbackTransaction()
        console.log(err)
        res.sendStatus(400)
    } finally {
        await db.close()
    }
}

function CreateCar(markId, modelId, transmission, year, fuel, body) {
    return {
        markId: markId,
        modelId: modelId,
        transmission: transmission,
        year: year,
        fuel: fuel,
        body: body
    }
}

function CreateAdvertisment(idCar, idUser, idCity, cost, description, photopath) {
    console.log(idUser)
    return {
        idCar: idCar, 
        idUser: idUser,
        idCity: idCity,
        cost: cost,
        description: description,
        isOpen: 1,
        photosPath: photopath
    }
}