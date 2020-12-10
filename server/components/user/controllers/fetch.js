const User = require('../../auth/models/user')

function FetchProfile(req, res) {
    User.findById(req.user._id).select("-_id -password -__v -lang_code -country_code -created_at").then(user=>{
        res.json(user)
    }).catch(err=>{
        return res.status(422).json({ error: err })
    })
}

module.exports = FetchProfile
