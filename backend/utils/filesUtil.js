const fs = require('fs')
const path = require('path');

function addPhotosPathsToEachAdvertisments(advertisments) {
    advertisments.forEach(advrtsmnt => {
        paths = getFilesPathsFromDirectory(advrtsmnt.photo_path)
        advrtsmnt.photo_path = paths
        
        console.log(advrtsmnt)
    })
    return advertisments
}

function getFilesPathsFromDirectory(relativePath) {
    const absolutePath = path.join(__dirname, process.env.ADVERTISMENT_STORAGE, relativePath)
    console.log(absolutePath)
    files = fs.readdirSync(absolutePath, {withFileTypes: true})
    paths = []
    console.log(files)
    files.forEach(elem => {
        paths.push(relativePath + '/' + elem.name)
    })
    return paths
}


module.exports = {getFilesPathsFromDirectory, addPhotosPathsToEachAdvertisments}