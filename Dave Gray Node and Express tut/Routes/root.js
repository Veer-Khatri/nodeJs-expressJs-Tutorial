const express = require("express");
const router = express.Router();
const path = require('path');
router.get('^/$|/index(.html)?',(requestt, responsee)=>{
    // responsee.sendFile("./Dave Gray Node and Express tut/views/index.html", {root: __dirname}) // first way
    responsee.sendFile(path.join(__dirname, "../views" , "index.html")) // second way
})

router.get('/new-page(.html)?',(requestt, responsee)=>{
    // responsee.sendFile("./Dave Gray Node and Express tut/views/index.html", {root: __dirname}) // first way
    responsee.sendFile(path.join(__dirname, "../views" , "new-page.html")) // second way
})
router.get('/old-page(.html)?',(requestt, responsee)=>{
    responsee.redirect(301, "/new-page.html") //302 by default
})


module.exports = router;