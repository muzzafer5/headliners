const express = require('express')
const router = express.Router()

var Login = require('../controllers/admin_login')

var FetchUser = require('../controllers/fetch_user')
var FetchGame = require('../controllers/fetch_game')
const FetchNews = require('../controllers/fetch_news')

var RequireAdminLogin = require('../../../middleware/require_admin_login')

const FetchGameDetailed = require('../controllers/fetch_game_detailed')

router
    .route('/fetch/user')
    .get(RequireAdminLogin, (req, res) => FetchUser(req, res))

router
    .route('/fetch/game')
    .get(RequireAdminLogin, (req, res) => FetchGame(req, res))

router
    .route('/fetch/game/detailed')
    .get(RequireAdminLogin, (req, res) => FetchGameDetailed(req, res))

router
    .route('/fetch/news')
    .get(RequireAdminLogin, (req, res) => FetchNews(req, res))

router
    .route('/login')
    .post((req,res) => Login(req,res))

module.exports = router
