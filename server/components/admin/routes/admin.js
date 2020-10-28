const express = require('express')
const router = express.Router()

var FetchUser = require('../controllers/fetch_user')
var Login = require('../controllers/admin_login')

var RequireAdminLogin = require('../../../middleware/require_admin_login')

router
    .route('/fetch/user')
    .get(RequireAdminLogin, (req, res) => FetchUser(req, res))

router
    .route('/login')
    .post((req,res) => Login(req,res))

module.exports = router
