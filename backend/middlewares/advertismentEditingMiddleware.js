const { MulterError } = require('multer')
const {uploadOnEditing} = require('../config/multerStorageConfig')

const uploadAdvertismentMiddleware = (req,res, next) => {
    uploadOnEditing(req,res,function(err, files) {
        if(err instanceof MulterError) {
            return res.status(400).json({err: err.message})
        }
        if(err) {
            return res.status(400).json({err: 'Unexpected error'})
        }
        next()
    })
}

module.exports = {uploadAdvertismentMiddleware}