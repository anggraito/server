var axios = require('axios')
var request = require('request');
var cheerio = require('cheerio');
var helperAnalyze = require('../helper/helperAnalyze')

function analyze (arrNews, res) {
  // looping sebanyak element array untuk di analisa
  var analyzeResult = []
  var counter = 0
  // start looping
  var arrayPromise = []
  arrNews.forEach(news => {
    console.log('inside foreach', counter)
    // console.log('-------------news------------', news )
    var analyzed = helperAnalyze.analyze(news.text.text[0]) // return promise
    console.log('analyzed', analyzed)
    arrayPromise.push(analyzed)
    // analyzed.linksite = news.linksite
    // console.log('analyzed', analyzed)
    // analyzeResult.push(analyzed)
    // counter += 1
    // console.log('counter', counter)
    // if (counter === arrNews.length) {
    //   console.log('counter', counter)
    //   res.send(analyzeResult)
    // }
  })
  // console.log('arrayPromise --------------------->', arrayPromise)
  console.log('arrayPromise.length --------------------->', arrayPromise.length)
  Promise.all(arrayPromise).then(function(hasilakhir) {
      console.log('--------------hasil akhir--------------', hasilakhir )
      console.log('--------------hasilakhir length--------------', hasilakhir.length )
      res.send(hasilakhir) 
    })
  
  console.log('after promise all')

  // res.send(arrayPromise) // harusnya isinya function promise2
}

// ditampung di array , terakir di promise all

function translate (scrapData, req, res) {
  var key = 'trnsl.1.1.20171102T111252Z.359135713e63ed1f.8ce92bdc31ac888e9daf7d12f2bcd5fb5160f574'
  var counter = 0
  var arrTranslate = []
  scrapData.forEach(data => {
    axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${data.dataTexts}&lang=id-en`)
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

function mapURL (url, req, res) {
  var count = 0
  var promiseCounting = 0
  var arrData = []
  url.forEach((dataText) => {
    request(`${dataText.url}`, function (error, response, html) {
      if(!error && response.statusCode == 200) {
        var $ = cheerio.load(html)
        var fixSpaceUsingRegex

          $('.content').each(function(i, element){
            text = $(this).text()
            fixSpaceUsingRegexs = text.replace(/\s+/gm, ' ')
            // console.log(typeof(fixSpaceUsingRegex));
            fixSpaceUsingRegex = fixSpaceUsingRegexs.replace(/[^a-zA-Z0-9 ]/g, "");
            datas = {
              linksite: dataText.url,
              dataTexts: fixSpaceUsingRegex
            }

            arrData.push(datas)
            count +=1
          })

          if(count === url.length)
          {
            // console.log('===>', arrData);
            // res.send(arrData)
            translate (arrData, req, res)
          }
      }
    })
  })
}

var getDataScrapping = (req, res) => {

  request('http://www.tribunnews.com/tag/kecelakaan-lalulintas?page=2', function (error, response, html) {
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
      //  console.log('===>', arrUrl);
       mapURL(arrUrl, req, res)
     }
   })
}

module.exports = {
  getDataScrapping
}
