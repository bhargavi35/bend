const express = require("express")
const { createTodos, getTodos, updateTodos, deleteTodos, searchTodos } = require("../controller/todoController")
const authentication = require("../middleware/auth")
const router = express.Router()

router.get("/getTodos",authentication, getTodos)
router.post("/createTodos",authentication, createTodos)
router.put("/updateTodos/:todoId",authentication, updateTodos)
router.delete("/deleteTodos/:todoId",authentication, deleteTodos)
router.get("/searchTodos",authentication, searchTodos)



module.exports = router 