const { Router } = require('express')
const advertismentInfoRouter = Router()
const advertismentInfoController = require('../controllers/advertismentInfoController')

advertismentInfoRouter.get('/advertismentInfo', advertismentInfoController.getInfo)

module.exports = advertismentInfoRouter