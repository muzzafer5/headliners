const Game = require('../../game/models/game')

function FetchGame(req, res) {
    Game.find({}).populate("user_id", "username", "users")
        .then(games => {
            res.json(games)
        })
        .catch(err => {
            return res.status(422).json({ error: err })
        })
}

module.exports = FetchGame