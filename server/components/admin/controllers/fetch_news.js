const News = require('../../game/models/all_news')

function FetchNews(req, res) {
    News.find({}).select("-created_at -__v")     
        .then(news => {
            res.json(news)
        })
        .catch(err => {
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchNews