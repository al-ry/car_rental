const {uploadOnEditing} = require('../config/multerStorageConfig')

const uploadAdvertismentMiddleware = (req,res, next) => {
    console.log(req)
    uploadOnEditing(req,res,function(err, files) {
        if(err) {
            return res.status(400).json({err: err.message})
        }
        next()
    })
}

module.exports = {uploadAdvertismentMiddleware}