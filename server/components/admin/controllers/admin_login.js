const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { SECRET_KEY, AdminPassword, AdminId} = require('../../../config/keys')

function AdminLogin(req, res) {
    if (req.body.password === AdminPassword) {
            const payload = {
                id: AdminId,
                password : AdminPassword
            }
            let token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: 3600 * 24 * 30
            })
            res.json(token)
    }
    else {
        return res.status(422).json({ error: "error" })
    }
}

module.exports = AdminLogin
