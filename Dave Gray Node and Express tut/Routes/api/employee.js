const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

router.route("/")
    .get((requestt,responsee) =>{
        responsee.json(data.employees)
    })
    .post((req,res)=>{
        // Not writing down all the code for api
        // just showing how we can get the parameters from a post request and sending that parameters back
        res.json({
            "firstname" : req.body.firstname,
            "lastname": req.body.lastname
        })
    })   
    .put((req,res)=> {
        res.json({
            "firstname" : req.body.firstname,
            "lastname": req.body.lastname
        })    
    })
    .delete((req,res)=>{
        res.json({"id":req.body.id})
    });

router.route("/:id")
    .get((req,res)=>{
        res.json({"id":req.params.id})
    })



module.exports = router