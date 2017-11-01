var request = require('request');
var cheerio = require('cheerio');

var getDataScrapping = (req, res) => {
  request('http://www.tribunnews.com/tag/kecelakaan', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var url
      var itterationData = []
      $('.mr140 a').each(function(i, element){
        url = $(this).attr('href')
        dataTraversion = {
          url: url
        }
        itterationData.push(dataTraversion)
    })
    res.send(itterationData)
    }
  })
}

var newsDetail = (req, res) => {
  request('http://www.tribunnews.com/metropolitan/2017/10/29/kecelakaan-di-tol-dalam-kota-ini-ulah-pengemudi-pajero-yang-masih-anak-anak', function (error, response, html) {
    if(!error && response.statusCode == 200) {
      var $ = cheerio.load(html)
      var fixSpaceUsingRegex
      $('.content').each(function(i, element){
        text = $(this).text()
        fixSpaceUsingRegex = text.replace(/\s+/gm, ' ')
        console.log(fixSpaceUsingRegex);
        res.send(fixSpaceUsingRegex)
      })
    }
  })
}



module.exports = {
  getDataScrapping,
  newsDetail
}
