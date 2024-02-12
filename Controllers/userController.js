const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.register= async (req,res)=>{
    const {username,email,password}=req.body
    console.log("Inside reg request");

    try{
        //check email already exists
        const existingUser = await users.findOne({email})//email should be given as key value pair ,but since kay and value have same name we have to keep single 
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already exist!! Please Login...")

        }else{
            //add user to db
            const newUser= new users({
                username,email,password,profile:"",github:"",linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }

    // console.log(username,email,password);

    // res.status(200).json("register request recieved")
}

//login

exports.login= async (req,res)=>{
    const {email,password}=req.body
    console.log("Inside login request");

    try{
        //check email,password  exists
        const existingUser = await users.findOne({email,password}) 
        console.log(existingUser);
        if(existingUser){
            //generate jwt token for sucessful login user
            const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
            res.status(200).json({existingUser,token})

        }else{
            res.status(406).json("Invalid Email/Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//update profile
exports.editUser=async(req,res)=>{
    const userId=req.payload
    const {username,password,email,github,linkedin,profileImg}=req.body
    const profile = req.file?req.file.filename:profileImg

    console.log("Inside profile updation");
    console.log(username,password,email,github,linkedin,profile,userId);
    try{
        const updateUser= await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profile,github,linkedin},{new:true})
            console.log(updateUser);
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
       console.log("inside catch of controller");
        res.status(401).json(err)
    }
}
