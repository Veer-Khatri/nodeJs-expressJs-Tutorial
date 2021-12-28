const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {
        return this.users = data
    }
}

const bcrypt = require("bcrypt")
const handleLogin = async (req,res) =>{
    const { user, pass } = req.body
    if (!user || !pass) {
        return res.status(400).json({ "message": "username and password are required" })
    }
    const userExist = userDB.users.find((person)=>{return person.username === user })
    if(!userExist){
        return res.status(401).json({"message":"no such user"}); // Unauthorized
    }
    // evaluate Password
    const match = await bcrypt.compare(pass,userExist.password)
    if (match) {
        // create JWTs in next tutorial
        res.json({"message":`hello ${userExist.username}`})
    }else{
        res.status(401).json({"message":"incorrect password"})
    }
}


module.exports = {handleLogin}