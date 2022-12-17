const express = require("express")
const { addTask, getTasks, updateTask, deleteTask, checkTask } = require("../controller/taskController")
const authentication = require("../middleware/auth")
const router = express.Router()

router.get("/getTasks/:todoId",authentication, getTasks)
router.post("/addTask/:todoId",authentication, addTask)
router.patch("/updateTask/:todoId/:taskId",authentication, updateTask)
router.delete("/deleteTask/:todoId/:taskId",authentication, deleteTask)
router.get("/checkTask/:todoId/:taskId",authentication, checkTask)



module.exports = router 