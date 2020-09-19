const express=require('express')
router=express.Router()
const {requireLogin}=require('../middlwares/requireLogin')
const {updatePassword,updateEmail,updateName,update}=require('../controllers/user')
router.put('/updatePassword',requireLogin ,updatePassword)
router.put('/updateEmail',requireLogin ,updateEmail)
router.put('/updateName',requireLogin ,updateName)
router.put('/updateu', requireLogin ,update)

module.exports=router