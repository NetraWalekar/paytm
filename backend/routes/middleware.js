const {JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(404).json({})
    }

    const token = authHeader.split(" ")[1]

    try{const decoded = jwt.verify(token , JWT_SECRET)
     
    if(decoded.userId){
        req.userId = decoded.userId
        next()
    }else{
        res.status(404).json({})
    }
   
    }
    catch(err){
        res.status(404).json({})
    }
}

module.exports = authMiddleware



