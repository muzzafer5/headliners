const jwt = require('jsonwebtoken')
const { SECRET_KEY,AdminId,AdminPassword } = require('../config/keys')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in as admin" })
    }
    const token = authorization
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in as admin" })
        }
        else {
            if(payload.id === AdminId && payload.password === AdminPassword){
                next()
            }
            else{
                return res.status(401).json({ error: "you must be logged in as admin" })
            }
        }
    })
}