const joi = require('joi');
const express = require('express');


const router = require('./routes/cources');
//for debuging

const StartupDebuger = require('debug')('app:startup');
const dbDebuger=require('debug')('app:db');
//to start debug 
//export DEBUG=app:name,app:name2
//for all
//export DEBUG=app:*


//for securing using various http headers
const helmet=require('helmet')


//for configration and switching between different modes ie dev,production
const config = require('config');

//for logger
const morgan = require('morgan');



const app = express();



app.use('/api/cources', router);
//creating template engine


app.set('view engine','pug')
app.set('views', './views');


//to set custom template;
//app.set('views','path to template')
//process.env.NODE_ENV //for defalut its undefined;

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));


// to change env do:
// export NODE_ENV=production
//for body parsing
app.use(express.json());
app.use(helmet());
if (app.get('env') == "development") {
    app.use(morgan('tiny'));
    StartupDebuger("Morgan is running...");
}
dbDebuger("DB")


console.log("Application mode:" + config.get('name'));



app.get('/', (req, res) => {
    //res.send("Hello"); 
    res.render('index', { title: "App", message: "Hello" });
});

app.listen(3000, () =>{
    console.log("Listening on port 3000..")
})