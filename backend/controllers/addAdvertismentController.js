const {DBManager} = require('../database/db')
const fs = require('fs')
require('dotenv').config()
const path = require('path');

exports.addAdvertisment = async (req, res) => {
    const advrtsmnt = req.body
    const photosPath = path.join(req.body.uid)
    console.log(req.files)
    if (!req.files) {
        console.log(req.files)
        console.log('wrong')
    }
    const db = new DBManager()
    try {
        await db.connect()
        await db.beginTransaction()
        markId = await db.getCarIdByName(req.body.mark)
        modelId = await db.getCarModelByName(req.body.model, markId)
        newCar = CreateCar(markId, modelId, advrtsmnt.transmission, advrtsmnt.year, advrtsmnt.fuel, advrtsmnt.body)
        idCar = await db.insertCar(newCar)
        idCity = await db.getCityIdByName(advrtsmnt.city)
        advertisment = CreateAdvertisment(idCar, req.session.user.id, idCity, advrtsmnt.cost, advrtsmnt.description, photosPath)
        await db.insertAdvertisment(advertisment)
        await db.commitTransaction()
        res.sendStatus(200)
    } catch (err) {
        fs.rmdirSync(photosPath, { recursive: true }, (err) => {
            console.log(err)
        })
        await db.rollbackTransaction()
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