const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const jwtSecret = "secret"
const User=require('../models/User')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendEmail = require('../email/email.send')
const templates = require('../email/email.templates')
const { API,APP } = require('../config/dev')

const transporter = nodemailer.createTransport(sendgridTransport({
    service: 'SendGrid',
    auth:{
        api_key:`${API}`
    }
}))
exports.signup=(req,res)=>{
    const { name, ville, email, password, numtel } = req.body
    User.findOne({ email:email })
        .then((saveduser) => {
            if (saveduser) { res.status(400).json({ error: 'cet email est déjà utilisé' }) }
           
           else  {bcrypt.hash(password, 10)
                .then((hashed) => {
                    const user = new User({ name, email, password: hashed, numtel, ville })
                    user.save()
                    .then((result)=>{res.json(result)})
                })}
        }).catch((err) => { console.log(err) })
        
}
exports.signin=(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email})
    .then((saveduser)=>{
        if(!saveduser){return res.status(422).json({eroor:"mot de passe ou email invalide"})}
     else {  bcrypt.compare(password,saveduser.password)
        .then((match)=>{
            if(match){ const token=jwt.sign({_id:saveduser._id},jwtSecret)
            const {_id,name,email,ville,numtel,picture,confirmed}=saveduser
           return  res.json({token,confirmed,user:{_id,name,email,ville,numtel,picture}})}
             return res.status(422).json({error:'mot de passe ou email invalide'})
        })}
    })
}

exports.signinFacebook=(req,res)=>{
    const{name,email,password,ville,numtel,accessToken}=req.body
    User.findOne({email:email}).then((saveduser)=>{
        if(saveduser){
            const token=jwt.sign({_id:saveduser._id},jwtSecret)
          // const token=accessToken
            const{_id,email,password,ville,numtel,confirmed}=saveduser
            res.json({token,confirmed,user:{_id,name,email,password,ville,numtel}})
        }
       else { newUser = new User({
            name,
        
            email,
            numtel,
            password,
         
            
           
            ville
            
        })
        newUser.save()
        .then((saveduser)=>{
            const token=jwt.sign({_id:saveduser._id},jwtSecret)
         //  const token=accessToken
            const {name,password,email,numtel,ville,confirmed}=saveduser
            res.json({token,confirmed,user:{name,password,email,ville,numtel}})
        })}
    })
}
exports.resetPassword=(req,res)=>{
    crypto.randomBytes(48,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no.reply.loca@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${APP}/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
}

exports.newPassword=(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.confirm=(req,res)=>{
    const {confirmed}=req.body
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
       console.log(user)
           user.confirmed = true
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((result)=>{
               res.json(result)
           })
        
    }).catch(err=>{
        console.log(err)
    })
}
exports.confirmEmail=(req,res)=>{
    crypto.randomBytes(48,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                sendEmail(user.email, templates.confirm(token))
                .catch(err => console.log(err))
                res.json({message:"check your email"})
            })

        })
    })
}