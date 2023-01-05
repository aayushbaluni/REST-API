const express = require('express');
const app = express();


//for body parsing

app.use(express.json());

const cources = [
    {
        id: 1,
        name:"cources1"
    },
    {
        id: 2,
        name:"cources2"
    },
    {
        id: 3,
        name:"cources3"
    },

]

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
    const cource = {
        id: cources.length + 1,
        name: req.body.name
    }
    cources.push(cource);
    res.send(cources);
});


app.listen(3000, () =>{
    console.log("Listening on port 3000..")
})