const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3500;
const myApp = express();

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
myApp.get('/*',(requestt, responsee)=>{
    responsee.status(404).sendFile(path.join(__dirname,"Dave Gray Node and Express tut/views", "404.html")) 
})

myApp.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));