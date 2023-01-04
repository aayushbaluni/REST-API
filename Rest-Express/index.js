const express = require('express');
const app = express();



app.get('/', (req, res) => {
    res.send("Hello"); 
});
app.get('/api/cources', (req, res) => {
    res.send([1, 2, 3]); 
});

app.get('/api/cources/:id/:i', (req, res) => {
    res.send(req.params);
});
app.listen(3000, () =>{
    console.log("Listening on port 3000..")
})