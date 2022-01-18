const User = require("../data/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { user, pass } = req.body
    if (!user || !pass) {
        return res.status(400).json({ "message": "username and password are required" })
    }
    //check for duplicate username in the DB
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) {
        return res.sendStatus(409) // conflict
    }
    try {
        // encrypt the password
        const hashedPass = await bcrypt.hash(pass, 15);
        // create and store the new user 
        const result = await User.create({
            "username": user,
            "password": hashedPass
        })
        /*
        Other way to create user 
        const NewUSer =   new User({
            "username": user,
            "password": hashedPass
        });
        const result  = await NewUSer.save();
        */
        console.log(result);
        res.status(201).json({ "success": `New user ${user} created!` })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

module.exports = { handleNewUser }