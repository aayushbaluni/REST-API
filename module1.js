function log(message) {
    console.log(message);
}
// what we want to call it outside = inside  var to export;
module.exports.log = log;
//to export only the function we can use
//      module.exports=log
// and the require object is directly an object then.