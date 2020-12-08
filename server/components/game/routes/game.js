const express = require('express')
const router = express.Router()

var CreateGame = require('../controllers/create')

const RequireLogin = require('../../../middleware/require_login')

router
    .route('/create')
    .post(RequireLogin, (req, res) => CreateGame(req, res))

module.exports = router
