const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res,next) => {
    // check if the user has auth token
    const token = req.body.auth_token;
    if (!token) {
        return res.status(403).json({success:false,msg:'User not logged in!'})
    }

    // check if the token is the right one
    await jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
            return res.status(403).json({success:false,msg:'Token is not valid, Login again!'})
        }
        next();
    })
}

module.exports = authMiddleware