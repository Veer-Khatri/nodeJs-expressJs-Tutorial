const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");


const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {
        return this.users = data
    }
}
const bcrypt = require("bcrypt")
const handleLogin = async (req, res) => {
    const { user, pass } = req.body
    if (!user || !pass) {
        return res.status(400).json({ "message": "username and password are required" })
    }
    const userExist = userDB.users.find((person) => { return person.username === user })
    if (!userExist) {
        return res.status(401).json({ "message": "no such user" }); // Unauthorized
    }
    // evaluate Password
    const match = await bcrypt.compare(pass, userExist.password)
    if (match) {
        const roles = Object.values(userExist.roles) // Object.values returns the values not key value pair
        // creating JWTs
        // payload
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": userExist.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }

        );
        const refreshToken = jwt.sign(
            { "username": userExist.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }

        );
        // Saving refresh token with current user 
        const otherUsers = userDB.users.filter(person => person.username !== userExist.username);
        const currentUser = { ...userExist, refreshToken };
        userDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "../data/users.json"),
            JSON.stringify(userDB.users)
        );
        // httpOnly cookie is not available to js thats why we are sending refresh token in cookie otherwise in normal cookie we dont send it 
        // httpOnly cookie is not 100% secure but much secure than localStorage or normal cookie
        res.cookie("checker", refreshToken, { httpOnly: true ,  maxAge: 24 * 60 * 60 * 1000 })//sameSite:"None",secure:true, add this if deploying on browser not use this when using thunder client 
        res.json({ accessToken })
        // we must save the accessToken in memory not in cookie or localstorage so that it cant be accessed by js

    } else {
        res.status(401).json({ "message": "incorrect password" })
    }
}


module.exports = { handleLogin }

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