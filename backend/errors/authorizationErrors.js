

class AuthorizationError extends Error {
    constructor(msg) {
        super(msg);
        this.message = msg;
        this.name = 'Authorization Error';
    }
}