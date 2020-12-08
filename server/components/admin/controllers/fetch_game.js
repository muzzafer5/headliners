const Game = require('../../game/models/game')

function FetchGame(req, res) {
    console.log("edf")
    Game.find({}).populate("user_id", "username", "users")
        .then(games => {
            res.json(games)
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchGame