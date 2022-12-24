const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// sign up 
exports.createUserController = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userPresent = await User.findOne({ email })
    //TODO
    if (userPresent?.email) {
        res.send("Try loggin in, already exist")
    }
    else {
        try {
            bcrypt.hash(password, 4, async function (err, hash) {
                const user = new User({ email, password: hash })
                await user.save()
                res.send("Sign up successfull")
            });

        }
        catch (err) {
            console.log(err)
            res.send("Something went wrong, pls try again later")
        }
    }
}


// login user 
exports.loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })

        if (user.length > 0) {
            const hashed_password = user[0].password;
            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ "userID": user[0]._id }, 'hash');
                    res.send({ "msg": "Login successfull", "token": token })
                }
                else {
                    res.send("Login failed")
                }
            })
        }
        else {
            res.send("Login failed")
        }
    }
    catch {
        res.send("Something went wrong, please try again later")
    }
}


// get user 
exports.getUserController = async(req,res)=>{
    try{
        const user = await User.findById(req.user.user_id);
        if(!user)
        throw new Error("no such user exists");
        user.password = undefined;
        res.status(201).json({
            success:true,
            user
        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}