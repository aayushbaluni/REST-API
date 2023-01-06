const express = require('express');

const app = express();
app.use(function (req,res,next) {
    //where next is the function that should be done after this
    //ie-> this function then nextfucntion to proceed in our execution pipeline;
});


//to serve constant/static file


app.use(express.static('file name having content'));
//and can be used using localhost/filename