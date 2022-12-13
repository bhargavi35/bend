require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require("./db")
const movieRouter = require("./routes/movie")
const app = express()

dbConnect()
app.use(express.json())
app.use(cors())

app.use("/api", movieRouter)

app.use("/", (req, res) => {
    res.send("Welcome")
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port:${port}... `))
