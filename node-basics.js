var logger=require('./module1');

console.log("Hello");

var hey = function () {
    console.log("Hey Function.");
    return;
}

logger.log(hey());
logger.log("HELLO");