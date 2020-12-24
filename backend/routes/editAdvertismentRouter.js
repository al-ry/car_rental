const { Router } = require('express')
const editAdvertismentRouter = Router()
const editAdvertismentController = require('../controllers/editAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')

editAdvertismentRouter.post('/editAdvertisement', checkSession, editAdvertismentController.edit)

editAdvertismentRouter.get('/editAdvertisement', checkSession, editAdvertismentController.getInfoForEditing)

module.exports = editAdvertismentRouter