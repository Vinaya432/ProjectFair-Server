const mongoose=require('mongoose')
const connectionString=process.env.connection_String

mongoose.connect(connectionString).then(
    ()=>{
        console.log("MongoDB Atlas Connected with pFServer");
    }
).catch((err)=>{
    console.log("MongoDB Connection Failed!!! ",err);
})