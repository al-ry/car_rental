
class BookingError extends Error {
    constructor(msg) {
        super(msg);
        this.message = msg;
        this.name = 'Booking Error';
    }
}


class AuthorizationError extends Error {
    constructor(msg) {
        super(msg);
        this.message = msg;
        this.name = 'Authorization Error';
    }
}

class RegistrationError extends Error {
    constructor(msg) {
        super(msg);
        this.message = msg;
        this.name = 'Registration Error';
    }
}

class EditingError extends Error {
    constructor(msg) {
        super(msg);
        this.message = msg;
        this.name = 'Registration Error';
    }
}


module.exports = {AuthorizationError, BookingError, RegistrationError, EditingError}