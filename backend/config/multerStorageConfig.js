const multer = require('multer')
const fs = require('fs');
const nanoid = require('nanoid')
const path = require('path');

const storageAdvertismentConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, path.join('uploads/'))
    console.log(req.test)
    fs.mkdir(path.join(__dirname, '../uploads/', req.body.unique), function(){
      cb(null, path.join(__dirname, '../uploads/', req.body.unique));
    });
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    name = nanoid.nanoid()
    return cb(null, name + "." + ext);
  }
});

const uploadAdvertisment = multer({storage:storageAdvertismentConfig})

module.exports = { uploadAdvertisment }