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
    gender: {
        type: String,
        require: true,
    },
    profession : {
        type : String,
        required :true
    },
    gender : {
        type : String,
        required :true
    },
    age : {
        type : Number,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    cultural_values : [{

    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("users", UserSchema)
module.exports = User
