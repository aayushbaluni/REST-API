const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function run() {
    
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);


    //similarly to decrypt or to compare;
    //bcrypt.compare(user.pass,req.body.pass)
}
//run();


//to get various tokens

const tokens = jwt.sign({
    //here it is the content of the token
    _id: 1
},
    //this is the private key
    //recommended to use it and store in an env variable
    "PRIVATEKEY"

);
console.log(tokens);