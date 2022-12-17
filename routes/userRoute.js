const express = require("express")
const { createUser, getUser, loginUser } = require("../controller/userController")
const authentication = require("../middleware/auth")
const router = express.Router()

router.post("/createUser", createUser)
router.post("/loginUser", loginUser)
router.get("/getUser", authentication, getUser)


module.exports = router 