const express = require('express')
const router = express.Router()

var FetchProfile = require('../controllers/fetch')
var FetchPlayedGame = require('../controllers/fetch_played_game')

const RequireLogin = require('../../../middleware/require_login')

router
    .route('/profile')
    .get(RequireLogin, (req, res) => FetchProfile(req, res))
router
    .route('/games')
    .get(RequireLogin, (req, res) => FetchPlayedGame(req, res))

module.exports = router
