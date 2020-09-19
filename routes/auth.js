const express=require('express')
router=express.Router()

const {requireLogin}=require('../middlwares/requireLogin')
const {signin,signup,signinFacebook,resetPassword,newPassword,confirm,confirmEmail}=require('../controllers/auth')


router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signupfacebook',signinFacebook)
router.post('/reset-password',resetPassword)
router.post('/newpassword',newPassword)
router.post('/confirm',confirm)
router.post('/confirm-email',requireLogin,confirmEmail)
module.exports=router