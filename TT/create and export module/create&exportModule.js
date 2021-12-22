const add = (a, b) => {
    // here a and b are parameters not arguments 
    // parameters are passed when we define a function
    // Arguments are given when we call the function  
    return a + b;
}
function subtract(a,b) {
    return a-b;
}

function sqr(a) {
    return a*a;
}

let name =  "veer"
// every individual file is called module

// Exporting without using object destructuring 

// module.exports.addFunc = add; // here dont write it as add() because we are not calling the function here
// module.exports.subtractFunc = subtract; 

// Exporting using object destructuring 
module.exports = {add, subtract, sqr, name}
