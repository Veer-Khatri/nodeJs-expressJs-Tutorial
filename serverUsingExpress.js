const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3500;
const myApp = express();
const cors = require("cors")
const {logger} = require("./Dave Gray Node and Express tut/Middleware/logEvents"); 
const  errorHandler  = require("./Dave Gray Node and Express tut/Middleware/errorHandler");
const req = require("express/lib/request");
const res = require("express/lib/response");

// custom middleware logger
myApp.use(logger)

// the whitelist websites only can request us to access our routes
const whiteList  = [,`https://www.google.com`,`http://127.0.0.1:55000`,"http://localhost:3500","http://127.0.0.1:3500"]
const corsOptions ={
    origin: (origin,callback)=>{
        if (whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true);
            
        }else{
            callback(new Error("not allowed by CORS"))
        }

    },
    optionSuccssStatus : 200
}
myApp.use(cors(corsOptions))// cors -- Cross Origin Resource Sharing  




// bulit-in middleware to handle urlencoded data 
// in other words , form data 
//  "content-type: application/x-www-form-urlencoded" 
myApp.use(express.urlencoded({extended:false}))// it will apply to all routes bottom of it 

// built-in middleware for json
myApp.use(express.json())

// serve static file
myApp.use(express.static(path.join(__dirname,"Dave Gray Node and Express tut/public")))

myApp.get('^/$|/index(.html)?',(requestt, responsee)=>{
    // responsee.sendFile("./Dave Gray Node and Express tut/views/index.html", {root: __dirname}) // first way
    responsee.sendFile(path.join(__dirname, "Dave Gray Node and Express tut/views" , "index.html")) // second way
})

myApp.get('/new-page(.html)?',(requestt, responsee)=>{
    // responsee.sendFile("./Dave Gray Node and Express tut/views/index.html", {root: __dirname}) // first way
    responsee.sendFile(path.join(__dirname, "Dave Gray Node and Express tut/views" , "new-page.html")) // second way
})
myApp.get('/old-page(.html)?',(requestt, responsee)=>{
    responsee.redirect(301, "/new-page.html") //302 by default
})

// Route Handlers 
myApp.get('/hello(.html)?',(requestt, responsee, nextt)=>{
    console.log("Attempted to load hello.html");
    nextt();
}, (req,res)=>{ 
    res.send("boom boom robota robota boom boom robota robota");    
})

//  CHANNING ROUTING HANDLERS
const one = (requestt, responsee, nextt) =>{
    console.log("one");
    nextt();
}
const two = (requestt, responsee, nextt) =>{
    console.log("two");
    nextt();
}
const three = (requestt, responsee, nextt) =>{
    console.log("three");
    responsee.send("finished");
    
}

myApp.get("/chain(.html)?",[one ,two ,three]);
myApp.all('*',(requestt, responsee)=>{
    responsee.status(404)
    if (req.accepts('html')) {
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