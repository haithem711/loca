const mongoose=require('mongoose')


UserSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
  
   
    ville: {
        type: String,
        
    },
   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        
    },
    role: {
        type: Number,
        default: 0
      },
   
    numtel: {
        type: String,
        
    },
    resetToken:{type:String},
    expireToken:{type:Date} ,
    
    date: {
        type: Date,
        default: Date.now
    }
    ,picture:{
        type:String,
        default:'https://res.cloudinary.com/dw9j1appv/image/upload/v1592939233/59032614de56cNo-image-available_azeggv.jpg'
       
                },
                confirmed: {
                    type: Boolean,
                    default: false
                  }

})

module.exports=mongoose.model('User',UserSchema)