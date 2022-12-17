const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//sign
const createUser = async (req, res) => {
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

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.find({ email })

//         if (user.length > 0) {
//             const hashed_password = user[0].password;
//             bcrypt.compare(password, hashed_password, function (err, result) {
//                 if (result) {
//                     const token = jwt.sign({ "userID": user[0]._id }, 'hash');
//                     res.send({ "msg": "Login successfull", "token": token })
//                 }
//                 else {
//                     res.send("Login failed")
//                 }
//             })
//         }
//         else {
//             res.send("Login failed")
//         }
//     }
//     catch {
//         res.send("Something went wrong, please try again later")
//     }
// }

// login user 

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const isEmailExists = await User.findOne({ email });
        if (!isEmailExists)
            throw new Error("no such email found please sign up");

        const user = await User.findOne({ email });
        // console.log(user)
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword)
            throw new Error("wrong password");


        const data = {
            id: user._id
        }

        const token = await jwt.sign(data, 'hash');

        user.password = undefined;
        res.status(201).cookie('token', token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: false
        }).json({
            success: true,
            token,
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

// get user 
const getUser = async(req,res)=>{
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

module.exports = { createUser, loginUser, getUser };
