const NewsAPI = require('newsapi');
const { newsApiKey } = require('../../../config/keys');
const User = require('../../auth/models/user')

const newsApi = new NewsAPI(newsApiKey);

function Fetch(req, res) {  
    newsApi.v2.topHeadlines({
        category: req.body.category,
        language: 'en',
        country: 'in'
    }).then(response => {
        news = response.articles
        res.json(news[0])
    }).catch(err => {
        return res.status(422).json({ error: err })
    })
}

module.exports = Fetch

