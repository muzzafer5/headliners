const Game = require('../models/game')
const User = require('../../auth/models/user')
const AllNews = require('../models/all_news')

async function CreateGame(req, res) {
    console.log("enter")
    var news = req.body.news
    for (var i of Object.keys(news)){
        await AllNews.findByIdAndUpdate(news[i].news_id, { $push: { users_involved: req.user._id } }, { new: true },  function(err, result){
            if(err){
                console.log(err)
                return res.status(422).json({ error: err }) 
            }
        })
    }
    User.findById(req.user._id).then(user => {
        var data = {
            user_id : user._id,
            country_code: user.country_code,
            lang_code : user.lang_code,
            news: news
        }
        Game.create(data).then(result => {
            res.send("done")
        }).catch(err => {
            console.log(err)
            return res.status(422).json({ error: err })
        })
    }).catch(err => {
        console.log(err)
        return res.status(422).json({ error: err })
    })
}

module.exports = CreateGame
