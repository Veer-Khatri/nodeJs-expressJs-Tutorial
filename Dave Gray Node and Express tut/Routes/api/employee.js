const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController")


router.route("/")
    .get(employeesController.getAllEmployeesData)
    .post(employeesController.createNewEmployee)   
    .put(employeesController.updateEmployee)
    .delete(employeesController.removeEmployee);

router.route("/:id")
    .get(employeesController.getSpecificEmployee)



module.exports = router