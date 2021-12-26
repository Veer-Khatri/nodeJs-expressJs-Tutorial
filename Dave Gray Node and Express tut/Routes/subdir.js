const express = require("express")
const router = express.Router();
const path = require("path")
router.get('^/$|/index(.html)?',(requestt, responsee)=>{
    responsee.sendFile(path.join(__dirname, "../views","subdir" , "index.html")) // second way
})
router.get('/test(.html)?',(requestt, responsee)=>{
    responsee.sendFile(path.join(__dirname, "../views","subdir" , "test.html")) // second way
})


module.exports = router;
