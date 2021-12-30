const fsPormises = require("fs").promises
const path = require("path")
const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {
        return this.users = data
    }
} 
const handleLogout = async (req, res) => {
    // on client, also can delete the accessToken
    const cookies = req.cookies
    if (!cookies?.checker) {
        return res.sendStatus(204); // No content to send back
    }
    const refrestToken = cookies.checker
    // if refreshToken in DB?
    const userExist = userDB.users.find((person) => { return person.refreshToken === refrestToken })
    if (!userExist) {
        res.clearCookie("checker",{httpOnly:true})
        return res.sendStatus(204)
    }
    // Delete the refresh token in database
    const otherusers =  userDB.users.filter(person =>person.refreshToken !== userExist.refreshToken )
    const currentUser = {...userExist, refreshToken:""}// emptied currentUser's refresh token
    userDB.setUsers([...otherusers, currentUser]);
    await fsPormises.writeFile(
        path.join(__dirname,"../data/users.json"),
        JSON.stringify(userDB.users)
    )
    res.clearCookie("checker",{httpOnly:true}) // secure :true : only serves on https
    res.sendStatus(204);
}


module.exports = { handleLogout }

//  -----------------------------READ THIS FOR UNDERSTANDING JWT----------------------------

//  JWT -- JSON WEB TOCKEN
// JWT is a form of user identification that is issued after the initial authorization of user (login/signup) take place 
// when user completes the login or they are authonticated our rest API will issue the application a Access token and Refresh Token
// ACCESS TOKENS - Access tokens are the thing that applications use to make API requests on behalf of a user.
// REFRESH TOKENS - Refresh Tokens are credentials used to obtain access tokens. Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires, or to obtain additional access tokens with identical or narrower scope.
// Access Tokens are valid for shorter duration(15 min) and Refresh Token are valid for longer duration(1 day)
// Hazards Risks - XSS: Cross-Site Scripting , CSRF: CS Request Forgery 
// our api will send and recieve access token as JSON data j
// To avoid the previously mentioned risks it is recommanded for frontend client applications to only store Access Token in memory --- 
//  --- so they will be lost automatically when applicatiion is closed 
// Access Token should not be stored in local storage or cookie
// Our API will issue Refresh Token in a httpOnly cookie this type of cookie is not accessible cia JavaScript 
// Refresh Token must have an expiry date which will then require users to login again
// Refresh Token should not have the ablity to issue new refresh tokens because that essiessentially grands indefinite access if the Refresh Token gets into the wrong hands

// -------------------------------PROCESS OF ACCESS TOKEN----------------------------------------
/*  Issueing the access token while user authorization 
Client uses it for accessing API until it expires
access tokens will be verified each time for accessing API with Middleware
When the token expires client will need to send there refresh token to generate new access token (no again login required for generating new access tokens)
*/
// -------------------------------PROCESS OF ACCESS TOKEN----------------------------------------
/*  Issueing the refresh token while user authorization
our rest API refresh endpoint will verify the token and cross-refrence the refresh token in our database
storing a refrence to refresh token in the database will allow token to be terminated early if the user decide to logout 
Refresh Token must expire because because that essiessentially grands indefinite access if the Refresh Token gets into the wrong hands
*/