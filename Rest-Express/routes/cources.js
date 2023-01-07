
const express = require('express');

const router = express.Router();



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


router.get('/', (req, res) => {
    res.send([1, 2, 3]); 
});

router.get('/:id', (req, res) => {
    const cource = cources.find(c => c.id == parseInt(req.params.id));
    if (!cource) res.status(404).send("Not Found.");
    res.send(cource);

});
router.post('/', (req, res) => {
  
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


router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const course = cources.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send("ID Not found");
        return;
    }
    const index = cources.indexOf(course);
    cources.splice(index, 1);
    res.send(cources);
});

module.exports = router;