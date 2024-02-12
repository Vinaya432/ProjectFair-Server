//Loads .env file contents into process.env by default-config method
require('dotenv').config()

const express=require('express')
const cors=require('cors')
const pfServer=express()
const router=require('./Routes/routes')

//connect mongoDB
require('./DB/connection')

pfServer.use(cors()) //for data sharing

//application specific middleware
pfServer.use(express.json()) //parse the data before going to router since json is  unknown for node
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

//for host
const PORT=3000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at port: ${PORT}`);
})

pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Project Fair started!!! Waiting for Client request...</h1>")
})