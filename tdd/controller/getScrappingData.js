var axios = require('axios')
var request = require('request');
var cheerio = require('cheerio');
var helperAnalyze = require('../helper/helperAnalyze')
var helperSendDB = require('../helper/helperSendDB')
var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('aef962244988878095f0e5b0dcb92650')

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
    // res.send(hasilakhir) 
    // var arrayResult = helperSendDB.writeDB(hasilakhir)
    var promisesSendDB = []
    hasilakhir.forEach( data => {
      if (data[0].lat !== null) {
        var promise = helperSendDB.send(data)
        promisesSendDB.push(promise)
      }
      console.log('next')
    })
    
    console.log('promisesSendDB', promisesSendDB)
    // console.log('arrayResult di controller', arrayResult)
    Promise.all(promisesSendDB)
      .then(result => {
        console.log('result', result)
        res.send(result)
      })
      .catch(err => {res.send(err)})
  })
}

function translate (scrapData, res) {
  var key = 'trnsl.1.1.20171103T070950Z.fcde122bc3f4e5ca.86bb0a9d13f0c54cca706ced923f398ca4ad2b1a'
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
        // res.send(arrTranslate)
        // function untuk analyze , then res.send inside the function
        analyze(arrTranslate, res)
        
      }
    })
    .catch(err => {
      console.log(err);
    })
  })
}

function mapURL (articleUrl, req, res) {
  var counter = 0
  var arrNewsData = []
  articleUrl.forEach(articleData => {
    diffbot.article({ uri: `${articleData.url}`}, function(err, response) {
      // console.log('response ===>', response)
      // if (response.media) console.log(JSON.stringify(response.media));
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
       mapURL(arrUrl, req, res)
     }
   })
}

module.exports = {
  getDataScrapping
}
