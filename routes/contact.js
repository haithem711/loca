const express=require ('express')

 router=express.Router()
const {contact}=require('../controllers/contact')

 router.post('/contact',contact)

 module.exports=router