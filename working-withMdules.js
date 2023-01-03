const path = require('path');
const os = require('os');
const file = require('fs');
var obj = path.parse(__filename);
console.log(obj);

var a = os.totalmem();
var b = os.freemem();
console.log({ a, b });

//Syncronously
var files = file.readdirSync('./');
console.log(files);

//non-Syncronous

var f = file.readdir('./', ((err, fil) => {
    if (err) console.log(err);
    else console.log(fil);
}));


//events
// signal that indicates something has happened.
const eventEmitter = require('events');
const emitter = new eventEmitter();
emitter.on("emitted", function () {
    console.log("recieved");
});
emitter.emit("emitted");
emitter.on("args", (args) => {
    console.log(args.name);
});

emitter.emit("args", { id: 1, name: "arg" });