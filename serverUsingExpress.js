const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3500;
const myApp = express();
const cors = require("cors")
const {logger} = require("./Dave Gray Node and Express tut/Middleware/logEvents"); 
const  errorHandler  = require("./Dave Gray Node and Express tut/Middleware/errorHandler");
const corsOptions = require("./Dave Gray Node and Express tut/config/corsOption")

// custom middleware logger
myApp.use(logger)



myApp.use(cors(corsOptions))// cors -- Cross Origin Resource Sharing  




// bulit-in middleware to handle urlencoded data 
// in other words , form data 
//  "content-type: application/x-www-form-urlencoded" 
myApp.use(express.urlencoded({extended:false}))// it will apply to all routes bottom of it 

// built-in middleware for json
myApp.use(express.json())

// -----------------------Serve static file------------------------------------
myApp.use(express.static(path.join(__dirname,"Dave Gray Node and Express tut/public")))


// ---------------------------------ROUTES-------------------------------------------------- 
myApp.use("/",require("./Dave Gray Node and Express tut/Routes/root"))
myApp.use("/employee",require('./Dave Gray Node and Express tut/Routes/api/employee'))
myApp.use("/register",require("./Dave Gray Node and Express tut/Routes/RegisterUser"))
myApp.use("/auth",require("./Dave Gray Node and Express tut/Routes/auth"))

// // Route Handlers 
// myApp.get('/hello(.html)?',(requestt, responsee, nextt)=>{
//     console.log("Attempted to load hello.html");
//     nextt();
// }, (req,res)=>{ 
//     res.send("boom boom robota robota boom boom robota robota");    
// })

// //  CHANNING ROUTING HANDLERS
// const one = (requestt, responsee, nextt) =>{
//     console.log("one");
//     nextt();
// }
// const two = (requestt, responsee, nextt) =>{
//     console.log("two");
//     nextt();
// }
// const three = (requestt, responsee, nextt) =>{
//     console.log("three");
//     responsee.send("finished");
    
// }

// myApp.get("/chain(.html)?",[one ,two ,three]);


myApp.all('*',(requestt, responsee)=>{
    responsee.status(404)
    if (requestt.accepts('html')) {
        responsee.sendFile(path.join(__dirname,"Dave Gray Node and Express tut/views", "404.html")) 
    }
    else if (req.accepts('html')) {
        responsee.json({error: "404 not found"}) 
    }
    else{
        res.type("txt").send("404 not found")
    }
})
myApp.use(errorHandler)

myApp.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));