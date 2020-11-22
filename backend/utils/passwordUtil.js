var crypto = require('crypto')
const {AuthorizationError} = require('../errors/authorizationErrors')

var GetRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length)
}

var SHA512 = function(password, salt)
{
    var hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    var value = hash.digest('hex')
    return {
        salt : salt,
        passwordHash : value
    }
}
var saltHashPassword = function(userPassword){
    var salt = GetRandomString(16)
    var passwordData = SHA512(userPassword, salt)
    return passwordData
}

var getPasswordHash = function(userPassword, salt) {
    var passwordData = SHA512(userPassword, salt)
    return passwordData
}

function checkPassword(passFromDB, passFromReq) {
    let pass = {
        salt : passFromDB.slice(0, 16),
        hash : passFromDB.slice(16, passFromDB.length)
    }
    hashPasswordReq = getPasswordHash(passFromReq, pass.salt).passwordHash
    hashPasswordDB = pass.hash
    if (hashPasswordDB != hashPasswordReq) {
        throw new AuthorizationError('Incorrect password')
    }
}

module.exports = {saltHashPassword, checkPassword}