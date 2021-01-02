const { Router } = require('express')
const popularMarksRouter = Router()
const popularMarksController = require('../controllers/popularMarksController')


popularMarksRouter.get('/popularMarks', popularMarksController.getPopularMarks)

module.exports = popularMarksRouter