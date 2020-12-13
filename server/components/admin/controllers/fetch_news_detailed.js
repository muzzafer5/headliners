const News = require('../../game/models/all_news')

function FetchNewsDetailed(req, res) {
    News.find({}).select("-__v").populate("users_involved", "username profession cultural_values gender age", "users")
        .skip(parseInt(req.params.skip))
        .limit(parseInt(req.params.limit))
        .then(news => {
            News.countDocuments({}, function(err, count){
                res.json({ news: news, count: count })
            })
        })
        .catch(err => {
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchNewsDetailed