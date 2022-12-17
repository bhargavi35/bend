const express = require("express")
const cors = require("cors")
const cookieParser=require("cookie-parser")

require("dotenv").config()
const { dbConnect } = require("./config/db")
const  userRoutes  = require("./routes/userRoute")
const  todoRoutes  = require("./routes/todoRoute")
const  taskRoutes  = require("./routes/taskRoute")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: "*"
}))

//db
dbConnect()

app.get("/", (req, res) => {
    res.send("Welocme to TODO App")
})
app.use("/api/users", userRoutes);

app.use("/api", taskRoutes);
app.use("/api", todoRoutes);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})