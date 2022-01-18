
const Employee = require("../data/Employee");
const getAllEmployeesData = async (requestt, responsee) => {
    const employees = await Employee.find()
    if (!employees) {
        return res.status(204).json({ message: "No employees found " })
    }
    responsee.status(200).json(employees)
}

const getSpecificEmployee = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ "message": ` ID parmeter is required not found` });

    }
    const employee = await Employee.findOne({ id: parseInt(req.params.id) });
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });

    }
    res.json(employee);
}

// Create this want to retrive  id of last employeeto give id to next employee
const createNewEmployee = async (req, res) => {

    // Not writing down all the code for api
    // just showing how we can get the parameters from a post request and sending that parameters back
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ "message": "Firstname and Lastname are required" })
    }
    try {
        let employeeID = Employee.find();
        console.log(employeeID);
        while (await Employee.findOne({ id:employeeID })) {
            employeeID = employeeID + 1;
        }

        const result = await Employee.create({
            id: employeeID,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        res.status(201).json({ result })
    } catch (error) {
        console.log(error);
    }
}

const updateEmployee = async (req, res) => {
    if (!req.body.id) {
        res.status(400).json({ "message": "Id is required for updating employee" })
    }
    const employee = await employee.findOne({ id: parseInt(req.body.id) });

    if (!employee) {
        return res.status(400).json({ "message": `cant find employee` });
    }

    if (req.body.firstname) { employee.firstname = req.body.firstname };
    if (req.body.lastname) { employee.lastname = req.body.lastname }
    const result = employee.save();
    res.json(result)

}

const removeEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ "message": "Firstname and Lastname are required" })
    }
    const employee = Employee.findOne({ id: parseInt(req.body.id) })
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` })
    }
    await Employee.deleteOne(employee);
    res.status(201).json({ "message": `employee with id:${employee.id} removed` })
}

module.exports = {
    getAllEmployeesData, getSpecificEmployee, createNewEmployee, updateEmployee, removeEmployee
}