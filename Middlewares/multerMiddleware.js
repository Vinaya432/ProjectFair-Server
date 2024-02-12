const multer = require('multer')

//to store the uploading files in uploads folder
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})


//checkng the file type of uploading file

const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg' || file.mimetype==='image/svg'){
        callback(null,true)
    }else{
        callback(null,false)
    }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig