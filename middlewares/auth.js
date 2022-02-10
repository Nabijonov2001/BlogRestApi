const jwt = require('jsonwebtoken')
const {SECRET_WORD} = require('../config')

module.exports = function auth(req, res, next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            ok:false,
            message:'You have not an access token!'
        })
    }
    try {
        let decoded = jwt.verify(token, SECRET_WORD)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            ok:false,
            message:'Invalid token!'
        })
    }
  
}

 