const User = require('../../auth/models/user')

function FetchUser(req, res) { 
    User.find({}).select("-__v -password")
    .then(users=>{
        res.json(users)
    })
    .catch(err=>{
        return res.status(422).json({ error: err })
    })
}

module.exports = FetchUser