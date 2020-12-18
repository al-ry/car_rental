const { Router } = require('express')

const userReviewRouter = Router()
const userReviewRouterController = require('../controllers/userReviewController')


userReviewRouter.get('/userReview', userReviewRouterController.getReviews)
module.exports = userReviewRouter