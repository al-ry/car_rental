const { Router } = require('express')
const marksRouter = Router()
const marksController = require('../controllers/marksController')


marksRouter.get('/modelsList', marksController.getMarks)

module.exports = marksRouter


