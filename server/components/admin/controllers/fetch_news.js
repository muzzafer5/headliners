const News = require('../../game/models/all_news')

function FetchNews(req, res) {
    News.find({}).select("-_id -created_at -users_involved -__v")
        .then(news => {
            res.json(news)
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchNews