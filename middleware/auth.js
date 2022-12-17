const jwt = require("jsonwebtoken")


const authentication = (req, res, next) => {
    // const token = req.headers?.authorization?.split(" ")[1]
    const token = req.header('token') || req.cookies.token

    try {
        if (token) {
            // const decoded = jwt.verify(token, 'hash')
            // if (decoded) {
            //     const userID = decoded.userID
            //     req.body.userID = userID
            //     next()
            const users = jwt.verify(token, "hash");
            // console.log(users)
            req.user = {
                user_id: users.id
            }
        }
    }

    catch (err) {
        return res.json({ message: "no", err })
    }
    next();
}


module.exports = authentication