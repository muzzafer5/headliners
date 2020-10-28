const express = require('express')
const router = express.Router()

var Fetch = require('../controllers/fetch')

const RequireLogin = require('../../../middleware/require_login')

router
    .route('/fetch')
    .post(RequireLogin,(req, res) => Fetch(req, res))

module.exports = router
