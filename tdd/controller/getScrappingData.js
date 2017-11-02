var axios = require('axios')
var request = require('request');
var cheerio = require('cheerio');


function translate (scrapData, req, res) {
  var key = 'trnsl.1.1.20171102T063424Z.ab0d7c20aa55a9a2.fe862c678d8a7fe08f5b65cc896e20c5cf365e16'
  var counter = 0
  var arrTranslate = []
  scrapData.forEach(data => {
    axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${data.dataTexts}&lang=id-en`)
    .then(texting => {
      data = {
        linksite: data.url,
        text: texting.data
      }
      arrTranslate.push(data)
      counter +=1
      if(counter === scrapData.length) {
        res.send(arrTranslate)
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

    request('http://www.tribunnews.com/tag/kecelakaan', function (error, response, html) {
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
       console.log('===>', arrUrl);
       mapURL(arrUrl, req, res)
     }
   })
}




// var newsDetail = (req, res) => {
//   request('http://www.tribunnews.com/metropolitan/2017/10/29/kecelakaan-di-tol-dalam-kota-ini-ulah-pengemudi-pajero-yang-masih-anak-anak', function (error, response, html) {
//     if(!error && response.statusCode == 200) {
//       var $ = cheerio.load(html)
//       var fixSpaceUsingRegex
//       $('.content').each(function(i, element){
//         text = $(this).text()
//         fixSpaceUsingRegex = text.replace(/\s+/gm, ' ')
//         console.log(fixSpaceUsingRegex);
//         res.send(fixSpaceUsingRegex)
//       })
//     }
//   })
// }



module.exports = {
  getDataScrapping
}
