console.log("before");

getUser(1,  (user)=> {
    console.log(user.id + " " + user.name);
    getInfo(user.name, (s) =>{
        console.log(s);
    })
});

console.log("after");

//representation of callbacks
function getUser(id,callback) {
    setTimeout(() => {
        console.log("Reading about user");
        callback({ id: id, name: "Ayush" });
        
}, 2000);
}

function getInfo(name, callback) {
    setTimeout(()=>{
        console.log("Giving info about " + name);
        callback("INfo");
    }, 2000);
}