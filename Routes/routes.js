const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//route for register
router.post('/register',userController.register)

//route for login
router.post('/login',userController.login)

//route for add project,route specific middleware
router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

//get home projects
router.get('/home-projects',projectController.getHomeProjects)

//get all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)

//get user project
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)

//edit project
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject)

//delete project
router.delete('/project/delete/:pid',jwtMiddleware,projectController.deleteProject)

//update profile
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImg"),userController.editUser)


module.exports=router