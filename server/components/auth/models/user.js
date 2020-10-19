const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profession : {
        type : String,
        required :true
    },
    country : {
        type : String,
        required : true
    },
    location : {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("users", UserSchema)
module.exports = User
