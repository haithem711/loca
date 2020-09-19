const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const jwtSecret = "secret"
const User=require('../models/User')


exports.updatePassword = (req, res) => {
    let userFields = {}
    const { password } = req.body
     
     bcrypt.hash(password,10, function(err, hash) {
        const  password=hash
        userFields.password = password
        console.log(userFields)
        User.findByIdAndUpdate(req.user._id, { $set: userFields }, (err, data) => {
            res.json({ msg: "password modifié" })
        });
     })
  /*  bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(userFields.password, salt, function (err, hash) {
            userFields.password = hash
        });
    })*/
   
          
       
}


exports.updateEmail = (req, res) => {
    const { email } = req.body
    User.findOne({ email: email })
        .then(saveduser => {
            if (saveduser) { return res.status(422).json({ error: 'email invalid' }) }
            User.findByIdAndUpdate(req.user._id, {
                $set: { email: email }
            }, { new: true },
                (err, result) => {
                    if (err) {
                        return res.status(422).json({ error: "email canot post" })
                    }
                    res.json(result)
                })
        })
}
exports.updateName = (req, res) => {
    const { name } = req.body
    User.findByIdAndUpdate(req.user._id, {
        $set: { name: name }
    }
        , { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "name canot post" })
            }
            res.json(result)
        })
  }

  exports.update=(req,res)=>{
      const { ville, numtel } = req.body
      let userFields = {}
      if (ville) userFields.ville = ville
      if (numtel) userFields.numtel = numtel
      User.findByIdAndUpdate(req.user._id, { $set: userFields }, { new: true }, (err, data) => {
          // res.json({ msg: "modification valide" })
          res.json( data )
      });
  }