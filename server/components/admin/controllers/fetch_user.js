const User = require('../../auth/models/user')

function FetchUser(req, res) { 
    User.find({}).select("-_id -__v -password -created_at")
    .then(users=>{
        res.json(users)
    })
    .catch(err=>{
        return res.status(422).json({ error: err })
    })
}

module.exports = FetchUser