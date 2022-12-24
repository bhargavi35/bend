const mongoose = require("mongoose");

const url = process.env.DB_URL;

const dbConnect =()=> mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log(`Connected to:${res.connection.name} database sucessfully`);
    })
    .catch((err) => console.log("Error while connecting to database :" + err.message));


module.exports = { dbConnect };
