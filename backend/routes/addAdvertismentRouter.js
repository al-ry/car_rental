const { Router } = require('express')
const addAdvertismentRouter = Router()
const addAdvertismentController = require('../controllers/addAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')
const {uploadAdvertisment} = require('../config/multerStorageConfig')

const upload = uploadAdvertisment.array('files', 6)
const uploadAdvertismentMiddleware = (req,res, next) => {
    upload(req,res,function(err) {
        if(err) {
            return res.status(400).json({err: err.message})
        }
        next()
    })
}

addAdvertismentRouter.post('/addAdvertisment', checkSession, uploadAdvertismentMiddleware, addAdvertismentController.addAdvertisment)


module.exports = addAdvertismentRouter


 