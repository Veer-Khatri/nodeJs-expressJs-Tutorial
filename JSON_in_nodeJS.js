// JSON stands for FavaScripty Object Notation
// JSON is a lightweight format for storing and transporting data
// JSON is often used when data is sent from a server to a web page


const obj = {
    name : "pata nahi",
    work :"programmer",
    age : 15  
    
}
let stringifiedOBJ = JSON.stringify(obj)
console.log(stringifiedOBJ); // {"name":"pata nahi","work":"programmer","age":15}

let parsed_stringifiedOBJ = JSON.parse(stringifiedOBJ)
console.log(parsed_stringifiedOBJ); // { name: 'pata nahi', work: 'programmer', age: 15 }


