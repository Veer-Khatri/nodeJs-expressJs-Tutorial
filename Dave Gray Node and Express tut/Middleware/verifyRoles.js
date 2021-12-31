const verifyRoles = (...allowedRoles) => { // this is rest operator and sperator both look same but use different paranthesis
    return (req, res, nxt) =>{
        if (!req?.roles) {
            return res.sendStatus(401);
        }
        const rolesArray = [...allowedRoles]
        const result = req.roles.map(role => rolesArray.includes(role)).find(value => value === true);
        if (!result) {
            return res.sendStatus(401);
        }
        nxt();
    }

} 

module.exports = verifyRoles;