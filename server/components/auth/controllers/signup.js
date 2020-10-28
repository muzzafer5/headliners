const bcrypt = require('bcryptjs')
const User = require('../models/user')

function Signup(req,res) {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    profession : req.body.profession,
    country : req.body.country,
    age : req.body.age,
    gender : req.body.gender,    
    cultural_values: req.body.cultural_values
  }
  User.findOne({
    username: req.body.username
  }) 
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
            User.create(userData)
            .then(user => {
              res.json("Registered")
            })
            .catch(err => {
              return res.status(422).json({error:err})
            })
        })
      } 
      else {
        return res.status(422).json({error:"User already exit"})
      }
    })
    .catch(err => {
      return res.status(422).json({error:err})
    })
}

module.exports = Signup

