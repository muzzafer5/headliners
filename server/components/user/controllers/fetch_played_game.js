const Game = require('../../game/models/game')

function FetchPlayedGame(req, res) {
    Game.find({ user_id : req.user._id}).limit(10)
        .select("news.Sports.news_id news.Entertainment.news_id news.Technology.news_id news.Education.news_id news.Health.news_id news.Politics.news_id -_id")
        .populate("news.Sports.news_id news.Entertainment.news_id news.Technology.news_id news.Education.news_id news.Health.news_id news.Politics.news_id", "article.title article.image", "allNews")
        .then(game => {
            res.json(game)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchPlayedGame
