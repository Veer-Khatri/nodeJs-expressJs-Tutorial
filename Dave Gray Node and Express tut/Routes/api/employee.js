const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController")
const Roles_list = require("../../config/roles_list");
const verifyRoles = require("../../Middleware/verifyRoles");

router.route("/")
    .post(verifyRoles(Roles_list.Admin, Roles_list.Editor), employeesController.createNewEmployee)
    .get(employeesController.getAllEmployeesData)
    .put(verifyRoles(Roles_list.Admin, Roles_list.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(Roles_list.Admin), employeesController.removeEmployee);

router.route("/:id")
    .get(employeesController.getSpecificEmployee)

module.exports = router