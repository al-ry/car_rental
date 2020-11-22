const { AuthorizationError } = require("../errors/authorizationErrors");

function checkLogin(login) {
    if (!login) {
        throw new AuthorizationError("Incorrect login")
    }
}

module.exports = {checkLogin}