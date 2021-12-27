const express = require("express");
const router = express.Router();
const path = require('path');
router.get('^/$|/index(.html)?',(requestt, responsee)=>{
    // responsee.sendFile("./Dave Gray Node and Express tut/views/index.html", {root: __dirname}) // first way
    responsee.sendFile(path.join(__dirname, "../views" , "index.html")) // second way
})
module.exports = router;