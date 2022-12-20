const Todo = require("../models/Todo");

//getTodos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.user_id });
        res.send({ "msg": "Todos Successfully Retrieved",todos });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

//createtodo
const createTodos = async (req, res) => {
    try {
        const user = req.user;
        // console.log(user)

        if (!user) {
            throw new Error("Please Login...");
        } else {
            const { title, color } = req.body;
            if (!title)
                throw new Error("title can't be empty");

            const new_todo = new Todo({ title, color, user: user.user_id });
            const savedTodo = await new_todo.save();
            res.send({ msg: "Todo created successfully", new_todo: savedTodo });
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

///update
const updateTodos = async (req, res) => {
    const { todoId } = req.params;
    const { title, color } = req.body;

    const checkTodo = await Todo.findById(todoId);
    try {
        if (!checkTodo) {
            throw new Error("no such Todo..");
        }
        // if (!userID) {
        //     throw new Error("Not authorised..")
        // }
        else {
            const todo = await Todo.findById(todoId);
            // console.log(todo)
            todo.title = title;
            todo.color = color;
            // console.log(todo)
            const updateTodo = await Todo.findByIdAndUpdate(todoId, todo);
            res.send({ msg: "Note updated successfully", updatedTodo:todo });
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

//delete
const deleteTodos = async (req, res) => {
    try {
        const { todoId } = req.params;
        const checkTodo = await Todo.findById(todoId);
        if (!checkTodo) throw new Error("no such todo exists");

        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        res.send({ msg: "Todo deleted successfully" , deletedTodo});
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

//search
const searchTodos = async (req, res) => {
    try {
        let { search } = req.query;

        const todos = await Todo.find({
            $or: [
                {
                    $and: [
                        { title: new RegExp(search, "i") },
                        { user: req.user.user_id },
                    ],
                },
                {
                    $and: [
                        { "tasks.main": new RegExp(search, "i") },
                        { user: req.user.user_id },
                    ],
                },
            ],
        });
        res.send({
            msg: "retrived query",
            todos,
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createTodos,
    getTodos,
    updateTodos,
    deleteTodos,
    searchTodos,
};
