var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"
const fetchjwt = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('Authorization');

    console.log("TOKEN",token);
    
    if(!token){
        res.status(401).send({error:"Invalid Auth Token"})

    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user = data.user
        next();
        console.log("JWT")
        
    } catch (error) {
        res.status(401).send({error:"Invalid Auth Token"})
    }

}
module.exports = fetchjwt