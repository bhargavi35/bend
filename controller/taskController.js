const Todo = require("../models/Todo");

//getTasks
const getTasks = async (req, res) => {
    try {
        const { todoId } = req.params;
        const checkTodo = await Todo.findById(todoId);
        if (!checkTodo) {
            throw new Error("no such Todo..");
        }
        const todo = await Todo.findById(todoId);
        const tasks = todo.tasks;
        res.send({ msg: "Todos Successfully Retrieved", tasks });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

//addTask
const addTask = async (req, res) => {
    try {
        const { todoId } = req.params;
        const checkTodo = await Todo.findById(todoId);
        if (!checkTodo) {
            throw new Error("no such Todo..");
        }
        const todo = await Todo.findById(todoId);
        //insert task
        todo.tasks.push({ main: req.body.main, taskupdatedAt: new Date() });
        const savedTask = await Todo.findByIdAndUpdate(todoId, todo);
        res.send({ msg: "Task created successfully", new_task: savedTask });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

///update
const updateTask = async (req, res) => {
    try {
        const { todoId, taskId } = req.params;
        console.log(req.user)
        const checkTodo = await Todo.findById(todoId);
        if (!checkTodo) {
            throw new Error("no such Todo..");
        }

        const todo = await Todo.findById(todoId);
        const checkTask = todo.tasks.filter((ele) => (ele._id = taskId));
        // console.log(checkTask)
        if (checkTask.length === 0) {
            throw new Error("no such task..");
        }
        //new task
        const updatedTasks = todo.tasks.map((ele) => {
            if (ele._id == taskId) {
                ele.main = req.body.main;
                ele.taskupdatedAt = new Date()
                return ele;
            }
            else
                return ele;
        });

        //update tod with task
        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);
        res.send({ msg: "tasks successfully updated" , updatedTodo});

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

//delete
const deleteTask = async (req, res)=>{
    try{
        const {todoId, taskId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);
        // console.log(checkTaskExist)

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");

        // creating new task with deleting targeted task 
        const updatedTasks = todo.tasks.filter(e=>e._id!=taskId)

        // then updating todo with new tasks 
        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully deleted",
            todo
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}
//search & change complete or not given task
const checkTask = async (req, res) => {
    try {
        const { todoId, taskId } = req.params;
        const checkTodo = await Todo.findById(todoId);
        if (!checkTodo) {
            throw new Error("no such Todo..");
        }
        const todo = await Todo.findById(todoId);
        const checkTask = todo.tasks.filter((ele) => (ele._id = taskId));
        // console.log(checkTask)
        
        if (checkTask.length == 0) {
            throw new Error("no such task..");
        }

        //tick done or not
        const updatedTasks = todo.tasks.map((ele) => {
            if (ele._id === taskId) {
                if (ele.checked) {
                    ele.checked = false;
                } else {
                    ele.checked = true;
                }
                return ele;
            } else {
                return ele;
            }
        });

        //update with new
        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);
        res.send({ msg: "tasks successfully checked/unchecked" , updatedTodo});
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    checkTask,
};
