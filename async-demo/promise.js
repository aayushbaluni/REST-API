const p = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        // resolve(1);
        reject(new Error("Message of Error"));
    }, 2000)

});
p.then(result => console.log(result)).catch(e => console.log(e.message));

//tp run all paraleel promises
//Promise.all([p1,p2]).then()