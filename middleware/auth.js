// const jwt = require("jsonwebtoken")


// const authentication = (req, res, next) => {
//     // const token = req.headers?.authorization?.split(" ")[1]
//     const token = req.header('token') || req.cookies.token

//     try {
//         if (token) {
//             // const decoded = jwt.verify(token, 'hash')
//             // if (decoded) {
//             //     const userID = decoded.userID
//             //     req.body.userID = userID
//             //     next()
//             const users = jwt.verify(token, "hash");
//             // console.log(users)
//             req.user = {
//                 user_id: users.id
//             }
//         }
//     }

//     catch (err) {
//         return res.json({ message: "no", err })
//     }
//     next();
// }


// module.exports = authentication

const jwt = require('jsonwebtoken');

const authetication = (req, res, next)=>{
    const token = req.header('token') || req.cookies.token
    // console.log(token)
    try{

        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODM5MjY1NWNlNjcyNWEyYWY5YzI3MyIsImlhdCI6MTY2OTU2NzA3N30.U5qzJW1J5b76sA1fgLWsFPYMcXkyySAk6hZNUb0vOWE";
        if(!token){
            return res.status(401).json({
                message: "No entry without auth"
            })
        }
        
        const users = jwt.verify(token,"hash");

        // console.log(users)

        req.user = {
            user_id:users.id
        }
        
        
    }
    catch(err){
        return res.json({message:"no",err})
    }
    next(); 
}

module.exports = authetication;