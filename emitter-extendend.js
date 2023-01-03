const ev = require('events');

class Logg extends ev{
    log(message) {
        this.emit(message);
    }
}
module.exports = Logg;