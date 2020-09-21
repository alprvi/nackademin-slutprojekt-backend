const jwt = require('jsonwebtoken')
require("dotenv").config()



function auth(req,res,next){
  //  console.log(req.headers)
    if(!req.headers.authorization) return res.sendStatus(403)
    const token = req.headers.authorization.replace("Bearer ", "")
    console.log(token)
    
    if(!token){
        res.status(401).send("You need to login")
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload);
        req.user = payload
        next()
    }catch(e){
        res.status(403).send("Bad token")
    }
}




module.exports = {auth}