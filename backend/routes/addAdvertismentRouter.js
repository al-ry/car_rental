const { Router } = require('express')
const addAdvertismentRouter = Router()
const addAdvertismentController = require('../controllers/addAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')
const {uploadAdvertisment} = require('../config/multerStorageConfig')

addAdvertismentRouter.post('/addAdvertisment', checkSession,uploadAdvertisment.array('files', 6), addAdvertismentController.addAdvertisment)

module.exports = addAdvertismentRouter