const express=require('express')
const bodyParser = require('body-parser')

const app = express()

/* Allow larger requests*/
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  }));
app.use(bodyParser.json({limit: "50mb"}));

const auth = require("./components/auth/routes/auth")
const news = require("./components/news/routes/news")
const admin = require("./components/admin/routes/admin")
const game = require("./components/game/routes/game")
const user = require("./components/user/routes/user")

app.use("/api/auth", auth)
app.use("/api/news", news)
app.use("/api/admin",admin)
app.use("/api/game", game)
app.use("/api/user", user)

module.exports = app

//export default app
