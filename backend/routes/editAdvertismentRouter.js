const { Router } = require('express')
const editAdvertismentRouter = Router()
const editAdvertismentController = require('../controllers/editAdvertismentController')
const {uploadOnEditing} = require('../config/multerStorageConfig')

const {checkSession} = require('../middlewares/checkSession')

editAdvertismentRouter.post('/editAdvertisment', checkSession, uploadOnEditing.array('files', 6), editAdvertismentController.edit)

editAdvertismentRouter.get('/editAdvertisement', checkSession, editAdvertismentController.getInfoForEditing)

module.exports = editAdvertismentRouter