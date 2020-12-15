const { Router } = require('express')
const advertismentListRouter = Router()
const advertismentListController = require('../controllers/advertismentListController')
const {paginateAdvertismentList} = require('../middlewares/paginatedAdvetismentList')

advertismentListRouter.get('/advertismentList', paginateAdvertismentList, advertismentListController.getList)

module.exports = advertismentListRouter