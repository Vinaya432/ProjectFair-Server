//for token verification 
const jwt =require('jsonwebtoken')

//creating a middleware
const jwtMiddleware=(req,res,next)=>{
    console.log("Inside JWT Middleware!!!");

    try{
        const token = req.headers['authorization'].split(" ")[1]
        console.log(token);

        if(token){
            const jwtResponse = jwt.verify(token,process.env.jwt_secret) //verify() inbuild function in json webtoken library to verify the token
            console.log(jwtResponse);
            req.payload=jwtResponse.userId //to store the userId get from the jwtResponse
            next()
        }else{
            res.status(401).json("Please provide token")
        }

    }catch{
        res.status(403).json("Please Login")
    }
}

module.exports =jwtMiddleware