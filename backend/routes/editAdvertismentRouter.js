const { Router } = require('express')
const editAdvertismentRouter = Router()
const editAdvertismentController = require('../controllers/editAdvertismentController')
const {uploadAdvertismentMiddleware} = require('../middlewares/advertismentEditingMiddleware')

const {checkSession} = require('../middlewares/checkSession')

editAdvertismentRouter.post('/editAdvertisement', checkSession, uploadAdvertismentMiddleware, editAdvertismentController.edit)

editAdvertismentRouter.get('/editAdvertisement', checkSession, editAdvertismentController.getInfoForEditing)

module.exports = editAdvertismentRouter