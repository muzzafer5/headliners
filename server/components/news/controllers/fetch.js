const News = require('../models/news');
const AllNews = require('../../game/models/all_news')
const User = require('../../auth/models/user');
const { newsApiKey1 } = require('../../../config/keys');
const request = require('request');

function Fetch(req,res){
    User.findById(req.user._id).then(user=>{
        if(user.country_code === 'gen'){
            var url = 'https://gnews.io/api/v4/top-headlines?' + 'topic=' + req.body.category + '&lang=' + user.lang_code + '&token=' + newsApiKey1
        }
        else{
            var url = 'https://gnews.io/api/v4/top-headlines?' + 'topic=' + req.body.category + '&lang=' + user.lang_code + '&country=' + user.country_code + '&token=' + newsApiKey1
        }
        var options = {
            'method': 'GET',
            'url': url,
            'headers': {
            }
        };
        News.findOne({country_code: user.country_code, lang_code : user.lang_code, category : req.body.category }).then(article=>{
            if(article){
                var diff = Date.now() - article.created_at
                diff = diff / 60000
                diff = Math.floor(diff)
                if (diff >= 600) {
                    request(options, async function (error, response) {
                        if (error) {
                            res.json(error)
                            return;
                        }
                        response = response.body
                        response = JSON.parse(response)
                        news = response.articles
                        var news_list = []
                        News.deleteOne({ country: user.country_code, lang_code: user.lang_code, category: req.body.category }).then(res => {
                        })
                        for (var i = 0; i < news.length; i++) {
                            var data = {
                                category: req.body.category,
                                country_code: user.country_code,
                                lang_code: user.lang_code,
                                article: news[i]
                            }
                            await AllNews.create(data).then(result => {
                                var obj = news[i]
                                obj.id = result._id
                                news_list.push(obj)
                                if (i == 0)
                                    res.json(obj)
                            })
                        }
                        var news_data = {
                            category: req.body.category,
                            country_code: user.country_code,
                            lang_code: user.lang_code,
                            news: news_list
                        }
                        News.create(news_data)
                            .then(data => {
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                }
                else {
                    var fetched_news = article.news;
                    var sz = fetched_news.length;
                    sz = sz * diff;
                    sz = sz / 600;
                    sz = Math.floor(sz)
                    //console.log(sz)
                    res.json(fetched_news[sz])
                }
            }
            else{
                request(options,async function (error, response) {
                    if (error){
                        res.json(error)
                        return ;
                    }
                    response = response.body
                    response = JSON.parse(response)
                    news = response.articles
                    var news_list = []

                    for (var i = 0; i < news.length; i++) {
                        var data = {
                            category: req.body.category,
                            country_code: user.country_code,
                            lang_code: user.lang_code,
                            article: news[i]
                        }
                        await AllNews.create(data).then(result => {
                            var obj = news[i]
                            obj.id = result._id
                            news_list.push(obj)
                            if(i==0)
                                res.json(obj)
                        })
                    }
                    
                    var news_data = {
                        category: req.body.category,
                        country_code: user.country_code,
                        lang_code: user.lang_code,
                        news: news_list
                    }
                    News.create(news_data)
                        .then(data => {
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            }
        })
    }).catch(err => {
        return res.status(422).json({ error: err })
    })
}

module.exports = Fetch

