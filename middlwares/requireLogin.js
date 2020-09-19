const { JsonWebTokenError } = require("jsonwebtoken")

const jwt=require('jsonwebtoken')
const jwtSecret="secret"
const mongoose=require('mongoose')
const User=require('../models/User')


exports.requireLogin=(req,res,next)=>{
    const {authorization}=req.headers
    if (!authorization){res.status(404).json({error:'you must log in'})}
    jwt.verify(authorization,jwtSecret,(err,payload)=>{
        if(err){ return res.status(404).json({error:'you must log in'})}
        const{_id}=payload
        User.findById(_id).then (userdata=>{
            req.user=userdata
            next()
        })
    })
}