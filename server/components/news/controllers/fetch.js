const NewsAPI = require('newsapi');
const { newsApiKey2 } = require('../../../config/keys');
const News = require('../models/news')

const newsApi = new NewsAPI(newsApiKey2);

function Fetch(req, res) {  
    News.findOne({ country: 'in', category: req.body.category}).then(result => {
        if(result){
            var diff = Date.now() - result.created_at
            diff = diff/60000
            diff = Math.floor(diff)
            if(diff>=60){
                News.deleteOne({ country: 'in', category: req.body.category}).then(res=>{
                    //console.log("done")
                })
                newsApi.v2.topHeadlines({
                    category: req.body.category,
                    language: 'en',
                    country: 'in'
                }).then(response => {
                    news = response.articles
                    var news_list = []
                    for (var i = 0; i < news.length; i++) {
                        if (news[i].description != null && news[i].description != '' && news[i].urlToImage != null && news[i].urlToImage != '') {
                            var obj = {
                                title: news[i].title,
                                description: news[i].description,
                                urlToImage: news[i].urlToImage
                            }
                            news_list.push(obj)
                        }
                    }
                    var news_data = {
                        category: req.body.category,
                        country: 'in',
                        news: news_list
                    }
                    News.create(news_data)
                        .then(data => {
                            res.json(data.news[0])
                        })
                        .catch(err => {
                            return res.status(422).json({ error: err })
                        })
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
            }
            else{
                var fetched_news = result.news;
                var sz = fetched_news.length;
                sz = sz*diff;
                sz = sz/60;
                sz = Math.floor(sz)
                //console.log(sz)
                res.json(fetched_news[sz])
            }   
        }
        else{
            newsApi.v2.topHeadlines({
                category: req.body.category,
                language: 'en',
                country: 'in'
            }).then(response => {
                news = response.articles
                var news_list = []
                for (var i=0;i<news.length;i++){
                    if (news[i].description != null && news[i].description != '' && news[i].urlToImage != null && news[i].urlToImage != ''){
                        var obj = {
                            title : news[i].title,
                            description : news[i].description,
                            urlToImage : news[i].urlToImage
                        }
                        news_list.push(obj)
                    }
                }
                var news_data =  {
                    category : req.body.category,
                    country : 'in',
                    news : news_list
                }
                News.create(news_data)
                    .then(data => {
                        res.json(data.news[0])
                    })
                    .catch(err => {
                        return res.status(422).json({ error: err })
                    })
            }).catch(err => {
                console.log("error")
                return res.status(422).json({ error: err })
            })
        }
    }).catch(err=>{
        res.status(422).json({ error: err })
    })
}

module.exports = Fetch

