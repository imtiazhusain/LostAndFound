
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const home= require('../controller/homeController')
const {login,loginForPost}= require('../controller/loginController')
const {signup,signupForPost}= require('../controller/signupController')
const userDashboard= require('../controller/userDashboardController')
const {insertItemDetails,insertItemDetailsForPost}= require('../controller/insertController')
const {upadateUserData,updateUserDataForPost}= require('../controller/updateController')
const {searchItems,searchItemForPost}= require('../controller/searchController')
const logout = require('../controller/logoutController')
const {deleteItems,deleteItemForPost} = require('../controller/deleteController')

// importing middlewares
const {isLogin,isLogout}= require('../middlewares/auth')



// using multer for uploading images of items
const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb) =>{
        cb(null,file.fieldname+"_" +Date.now()+path.extname(file.originalname))
    }
});

var uplaod = multer({
    storage:storage,

}).single('itemImage')


// routing

// Get Methods
router.get('/',isLogout,home)
router.get('/login',isLogout,login)
router.get('/signup',isLogout,signup)
router.get('/userDashboard',isLogin,userDashboard)
router.get('/insert',isLogin,insertItemDetails)
router.get('/update',isLogin,upadateUserData)
router.get('/search',isLogin,searchItems)
router.get('/logout',isLogin,logout)
router.get('/delete',isLogin,deleteItems)

// post Methods
router.post('/signup',signupForPost)
router.post('/login',loginForPost)
router.post('/search',searchItemForPost)
router.post('/update',updateUserDataForPost)
router.post('/delete/:id',isLogin,deleteItemForPost)
router.post('/insert',uplaod,insertItemDetailsForPost)





module.exports = router;