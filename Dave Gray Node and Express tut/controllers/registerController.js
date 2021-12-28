const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {
        return this.users = data
    }
}
const fsPromises = require("fs").promises
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { user, pass } = req.body
    if (!user || !pass) {
        return res.status(400).json({ "message": "username and password are required" })
    }
    //check for duplicate username in the DB
    const duplicate = userDB.users.find((person) => { return person.username === user })
    if (duplicate) {
        return res.sendStatus(409) // conflict
    }
    try {
        // encrypt the password
        const hashedPass = await bcrypt.hash(pass, 15);
        // store the new user 
        const newUser = { "username": user, "password": hashedPass }
        userDB.setUsers([...userDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, "../data/users.json"),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({"success":`New user ${user} created!`})
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}  

module.exports = {handleNewUser}