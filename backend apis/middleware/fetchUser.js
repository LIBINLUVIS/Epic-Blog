const jwt = require("jsonwebtoken")


const fetchUser = (req,res,next)=>{
    
    const token = req.header("auth-token")

    if(!token)return res.status(401).json({msg:"unauthorised access"})

    const data = jwt.verify(token,"shhh")
    req.id = data.id
    
    next()
}

module.exports = fetchUser