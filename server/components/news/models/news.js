const { urlencoded } = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    category : {
        type : String,
        required : true
    },
    country: {
        type: String,
        required : true
    },
    news : [
        {
            title : {
                type : String,
                required : true
            },
            description: {
                type: String,
                required: true
            },
            urlToImage: {
                type: String,
                required: true
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const News = mongoose.model("news", NewsSchema)
module.exports = News
