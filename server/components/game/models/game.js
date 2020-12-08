const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {ObjectId} = mongoose.Schema.Types

const NewsSchema = new Schema({
    user_id : {
        type : ObjectId,
        ref : "users",
        required : true
    },
    country_code: {
        type: String,
        required: true
    },
    lang_code: {
        type: String,
        required: true
    },
    news : {
       
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const News = mongoose.model("games", NewsSchema)
module.exports = News
