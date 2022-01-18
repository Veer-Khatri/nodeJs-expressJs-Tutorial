const express = require("express")
const  router  = express.Router();
const {handleRefreshToken} = require("../controllers/refreshAccessTokenController")


router.get('/', handleRefreshToken)


module.exports = router;