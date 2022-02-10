const jwt = require('jsonwebtoken')
const {SECRET_WORD} = require('../config')

function superadmin(req, res, next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            ok:false,
            message:'You have not an access token!'
        })
    }
    try {
        let decoded = jwt.verify(token, SECRET_WORD)
        if(decoded.role !=='superadmin') throw new Error('You have not an access token!')
        next()
    } catch (error) {
        res.status(401).json({
            ok:false,
            message:error+''
        })
    }
  
}

module.exports = superadmin