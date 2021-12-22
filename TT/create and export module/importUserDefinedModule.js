// --------Without using  destructuring to show how to import function without desturcturing-----

/* const sndFile = require("./create&exportModule.js");
// here a and b are parameters not arguments. parameters are passed when we define a function. Arguments are given when we call the function \
console.log(sndFile);
console.log(sndFile.addfunc(55,4));
console.log(sndFile.subtractfunc(99,88));
*/



// --------using  destructuring to show how to import functions------------
const {add, subtract, sqr, name } = require("./create&exportModule")
console.log(add(55,4));
console.log(subtract(99,88));
console.log(sqr(99));
console.log(name);






