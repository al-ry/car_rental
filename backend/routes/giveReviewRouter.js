const { Router } = require('express')
const giveReviewRouter = Router()
const giveReviewController = require('../controllers/giveReviewController')
const {checkSession} = require('../middlewares/checkSession')

giveReviewRouter.post('/giveReview', checkSession, giveReviewController.addReview)

module.exports = giveReviewRouter