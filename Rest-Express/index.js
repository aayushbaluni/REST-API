const joi = require('joi');
const express = require('express');

//for securing using various http headers
const helmet=require('helmet')


//for logger
const morgan = require('morgan');
const app = express();



//process.env.NODE_ENV //for defalut its undefined;

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));


// to change env do:
// export NODE_ENV=
//for body parsing
app.use(express.json());
app.use(helmet());
if(app.get('env')=="development")app.use(morgan('tiny'));

const cources = [
    {
        id: 1,
        name: "cources1"
    },
    {
        id: 2,
        name: "cources2"
    },
    {
        id: 3,
        name: "cources3"
    },

];


function validateCourse(cource) {
    const schema = joi.object({
        name: joi.string().min(3).required()

    });
    return schema.validate(cource);

};

app.get('/', (req, res) => {
    res.send("Hello"); 
});
app.get('/api/cources', (req, res) => {
    res.send([1, 2, 3]); 
});

app.get('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id == parseInt(req.params.id));
    if (!cource) res.status(404).send("Not Found.");
    res.send(cource);

});
app.post('/api/cources', (req, res) => {
  
    const { error } = validateCourse(req.body);
    

    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    
    const cource = {
        id: cources.length + 1,
        name: req.body.name
    }
    cources.push(cource);
    res.send(cources);
});


app.put('/api/cources/:id', (req, res) => {
    const course = cources.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send("ID Not found");
        return;
    }
    const { error } = validateCourse(req.body);
    

    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(cources);

});
app.delete('/api/cources/:id', (req, res) => {
    const course = cources.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send("ID Not found");
        return;
    }
    const index = cources.indexOf(course);
    cources.splice(index, 1);
    res.send(cources);
});

app.listen(3000, () =>{
    console.log("Listening on port 3000..")
})