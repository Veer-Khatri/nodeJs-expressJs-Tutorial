const data = {
    employees: require("../data/employees.json"),
    setEmployees: function (data) {return this.employees = data; }

};

const getAllEmployeesData = (requestt, responsee) => {
    responsee.json(data.employees)
}

const getSpecificEmployee = (req, res) => {
    const employee = data.employees.find((emp) => { return emp.id === parseInt(req.params.id)});

    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    const filteredArray = data.employees.filter((emp) => { return emp.id === parseInt(req.params.id)});

    data.setEmployees([...filteredArray])
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    // Not writing down all the code for api
    // just showing how we can get the parameters from a post request and sending that parameters back
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ "message": "first and last names are required" })
    }
    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find((emp) => {
        emp.id === parseInt(req.body.id)
        console.log(req.body.id);
        console.log(emp.id);
        console.log("hello");

    })
    console.log(employee)
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    if (req.body.firstname) { employee.firstname = req.body.firstname };
    if (req.body.lastname) { employee.lastname = req.body.lastname }
    const filteredArray = data.employees.filter((emp) => { return emp.id !== parseInt(req.body.id) });
    // in above array we removed the employee which is being updated 
    const unsortedArray = [...filteredArray, employee]
    // here we added the employee we removed in filteredArray after updating the employee credentials but this is unsorted array 

    data.setEmployees(unsortedArray.sort((a, b) => {return a.id > b.id ? 1 : a.id < b.id ? -1 : 0 })) // ? means true : means false
    // in above line ternery operators are doing this--------
    // if a's id is bigger than b's id return 1, if not then check for reverse condition  
    // if a's id is smaller than b's id than return -1, if not then return 0 
    // means 0 is returned when a's id == b's id


    res.json(data.employees)

}

const removeEmployee = (req, res) => {
    const employee = data.employees.find(emp => { return emp.id === parseInt(req.body.id) })
    if (!employee) {
       return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` })
    }
    const filteredArray = data.employees.filter((emp) => {return emp.id !== (parseInt(req.body.id)) })
    data.setEmployees([...filteredArray])
    res.json({ "id": req.body.id })
}

module.exports = {
    getAllEmployeesData, getSpecificEmployee, createNewEmployee, updateEmployee, removeEmployee
}