var axios = require('axios')
var request = require('request');
var cheerio = require('cheerio');
var helperAnalyze = require('../helper/helperAnalyze')
var helperSendDB = require('../helper/helperSendDB')
var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('aef962244988878095f0e5b0dcb92650')
const Accident = require('../models/Accident')

function analyze (arrNews, res) {
  var analyzeResult = []
  var counter = 0
  var arrayPromise = []
  arrNews.forEach(news => {
    var analyzed = helperAnalyze.analyze(news.text.text[0], news.linksite) // return promise
    arrayPromise.push(analyzed)
  })
 
  Promise.all(arrayPromise)
  .then(function(hasilakhir) { 
    console.log('hasil akhir', hasilakhir)
    var promisesSendDB = []

    hasilakhir.forEach( data => {
      if (data[0].lat !== null) {
        var promise = helperSendDB.send(data)
        promisesSendDB.push(promise)
      }
    })
    
    Promise.all(promisesSendDB)
      .then(result => {
        console.log('result', result)
        res.send({
          message: 'scrapped done',
          dataSendToDB: result
        })
      })
      .catch(err => {res.send(err)})
  })
}

function translate (scrapData, res) {
  var key = process.env.KEY_YANDEX
  var counter = 0
  var arrTranslate = []
  scrapData.forEach(data => {
    axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${data.news}&lang=id-en`)
    .then(texting => {
      data = {
        linksite: data.linksite,
        text: texting.data
      }
      arrTranslate.push(data)
      counter +=1
      if(counter === scrapData.length) {
        analyze(arrTranslate, res)
      }
    })
    .catch(err => {
      console.log(err);
    })
  })
}

function mapURL (articleUrl, res) {
  
  var counter = 0
  var arrNewsData = []

  articleUrl.forEach(articleData => {
    diffbot.article({ uri: `${articleData.url}`}, function(err, response) {
      
      article = response.objects[0].text.replace(/[^a-zA-Z0-9.,]/g, " ").replace(/\s+/gm, ' ')
      article = article.replace(/kecamatan/gi, 'district')
      data = {
          linksite: articleData.url,
          news: article
        }

        arrNewsData.push(data)
        counter +=1
        
      if (counter === articleUrl.length)
        {
        translate(arrNewsData, res)
        }
    })
  })
}

function cekVersioning(articleUrl, res) {
  // versioning  
  var newArticleUrl = []
  var counter = 0
  articleUrl.forEach(data => {
    // console.log('data', data)
    Accident.findOne({ linksite: data.url })
      .then(accident => {
        if (accident == null) { // article belum ada di db
          newArticleUrl.push(data)
        }

        counter += 1
        if (counter === articleUrl.length) {
          if (newArticleUrl.length > 0) {
            mapURL(newArticleUrl, res)
            // res.send(newArticleUrl)
          } else {
            res.send({
              message: 'scrapped done',
              dataSendToDB: []
            })
          }
        }

      })
      .catch(err => { console.log(err) })
  })
}


var getDataScrapping = (req, res) => {
  request('http://www.tribunnews.com/tag/kecelakaan?page=1', function (error, response, html) {
     if (!error && response.statusCode == 200) {
       var $ = cheerio.load(html);
       var url
       var arrUrl = []
       $('.mr140 a').each(function(i, element){
         url = $(this).attr('href')
         dataTraversion = {
           url: url
         }
         arrUrl.push(dataTraversion)
       })
       cekVersioning(arrUrl, res)
     }
   })
}

module.exports = {
  getDataScrapping
}
