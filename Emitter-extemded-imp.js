const Logger = require('./emitter-extendend');

const logg= new Logger();

logg.on("hello", () =>{
    console.log("Hello recieved");
})
logg.log("hello");