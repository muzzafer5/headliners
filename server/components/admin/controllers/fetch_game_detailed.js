const Game = require('../../game/models/game')

function FetchGameDetailed(req, res) {
    Game.find({})
        .select("-__v")
        .populate("user_id", "username gender country language age profession cultural_values -_id", "users")
        .populate("news.Sports.news_id news.Entertainment.news_id news.Technology.news_id news.Education.news_id news.Health.news_id news.Politics.news_id", "article", "allNews")
        .skip(parseInt(req.params.skip))
        .limit(parseInt(req.params.limit))
        .then(games => {
            Game.countDocuments({}, function (err, count) {
                res.json({ games: games, count: count })
            })
        })
        .catch(err => {
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchGameDetailed