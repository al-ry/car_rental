const {uploadAdvertisment} = require('../config/multerStorageConfig')

const uploadAdvertismentMiddleware = (req,res, next) => {
    uploadAdvertisment(req,res,function(err) {
        if(err) {
            return res.status(400).json({err: err.message})
        }
        next()
    })
}

module.exports = {uploadAdvertismentMiddleware}