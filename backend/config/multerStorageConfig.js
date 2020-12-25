const multer = require('multer')
const fs = require('fs');
const nanoid = require('nanoid')
const path = require('path');
const { MulterError } = require('multer');
require('dotenv').config()


const storageAdvertismentConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(path.join(__dirname, process.env.ADVERTISMENT_STORAGE, req.body.uid), function(){
      cb(null, path.join(__dirname, process.env.ADVERTISMENT_STORAGE, req.body.uid));
    });
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    name = nanoid.nanoid()
    return cb(null, name + "." + ext);
  }
});

const editedAdvertismentPhotos = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(path.join(__dirname, process.env.ADVERTISMENT_STORAGE, req.body.folder), function(){
      cb(null, path.join(__dirname, process.env.ADVERTISMENT_STORAGE, req.body.folder));
    });
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    let name = nanoid.nanoid()
    return cb(null, name + "." + ext);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb(new Error("File should have jpg, jpeg or png extension"))
  }
}

const uploadAdvertisment = multer({storage:storageAdvertismentConfig, fileFilter: fileFilter}).array('files', 6)
const uploadOnEditing = multer({storage:editedAdvertismentPhotos, fileFilter: fileFilter}).array('files', 6)

module.exports = { uploadAdvertisment, uploadOnEditing}