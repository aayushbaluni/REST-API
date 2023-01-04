var _ = require('underscore');

console.log(_.contains([1, 2, 3], 3));


// Major.Minor.patch

// also use ~ in place of ^ which means patches up to latest but major and moinor remains same.
// ~1.1.2

//to install specific version 
//npm i name@version
//npm un package -> to uninstall
//to check for updates install npm-check-updates