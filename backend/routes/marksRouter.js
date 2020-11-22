const { Router } = require('express')
const marksRouter = Router()
const marksController = require('../controllers/marksController')


marksRouter.get('/marksList', marksController.getMarks)

module.exports = marksRouter


