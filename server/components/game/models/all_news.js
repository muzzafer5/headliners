const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    lang_code: {
        type: String,
        required: true
    },
    article: {
        
    },
    users_involved : [
        
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const News = mongoose.model("allNews", NewsSchema)
module.exports = News
