const { Router } = require('express')
const marksRouter = Router()
const modelsController = require('../controllers/modelsController')


marksRouter.get('/modelsList', modelsController.getModels)

module.exports = marksRouter


