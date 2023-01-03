const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url = '/') {
        res.write("hello");
        res.end();
    }
});




// server.on("connection", (args) => {
//     console.log("Connected");
// })
server.listen(3000);
console.log(`Listnening on 3000`);
