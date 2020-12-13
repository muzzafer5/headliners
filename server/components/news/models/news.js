const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    category : {
        type : String,
        required : true
    },
    country_code: {
        type: String,
        required : true
    },
    lang_code : {
        type : String,
        required : true
    },
    news : [
        
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

NewsSchema.index({ 'country_code': 1, 'lang_code': 1, 'category' : 1 })

const News = mongoose.model("news", NewsSchema)
module.exports = News
