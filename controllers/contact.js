const Contact =require('../models/Contact')


exports.contact=(req,res)=>{
const { name , email , message}=req.body

  Contact.find({})
    const   contact = new Contact ({name,email,message})
      contact.save()
      .then((result,err)=>{
      if (err) { console.log({error:'error message'})}
      res.json({message:'merci pour votre message'})
      
  })
 


}