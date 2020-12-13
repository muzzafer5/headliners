const bcrypt = require('bcryptjs')
const User = require('../models/user')

const langMap = new Map([["Arabic", "ar"], ["German", "de"], ["Greek", "el"], ["English", "en"], ["Spanish", "es"], ["French", "fr"], ["Hebrew", "he"], ["Hindi", "hi"], ["Italian", "it"], ["Japanese", "ja"], ["Malayalam", "ml"], ["Marathi", "mr"], ["Dutch", "nl"], ["Norwegian", "no"], ["Portuguese", "pt"], ["Romanian", "ro"], ["Russian", "ru"], ["Swedish", "sv"], ["Tamil", "ta"], ["Telugu", "te"], ["Ukrainian", "uk"], ["Chinese", "zh"]]);
const countMap = new Map([["Australia", "au"], ["Brazil", "br"], ["Canada", "ca"], ["Switzerland", "ch"], ["China", "cn"], ["Germany", "de"], ["Egypt", "eg"], ["Spain", "es"], ["France", "fr"], ["United Kingdom", "gb"], ["Greece", "gr"], ["Hong Kong", "hk"], ["Ireland", "ie"], ["Israel", "il"], ["India", "in"], ["Italy", "it"], ["Japan", "jp"], ["Netherlands", "nl"], ["Norway", "no"], ["Peru", "pe"], ["Philippines", "ph"], ["Pakistan", "pk"], ["Portugal", "pt"], ["Romania", "ro"], ["Russian Federation", "ru"], ["Sweden", "se"], ["Singapore", "sg"], ["Taiwan, Province of China", "tw"], ["Ukraine", "ua"], ["United States", "us"]]);

function Signup(req,res) {

  var lang_code = langMap.get(req.body.language)

  if (countMap.has(req.body.country))
    var count_code = countMap.get(req.body.country)
  else
    var count_code = 'gen'

  const userData = {
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    profession : req.body.profession,
    country : req.body.country,
    age : req.body.age,
    gender : req.body.gender,   
    language : req.body.language,
    lang_code : lang_code,
    country_code : count_code, 
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

