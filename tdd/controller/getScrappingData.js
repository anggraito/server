var request = require('request');
var cheerio = require('cheerio');

var getDataScrapping = (req, res) => {
  request('http://www.tribunnews.com/tag/kecelakaan', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var url
      $('.mr140 a').each(function(i, element){
        url = $(this).attr('href')
        dataTraversion = {
          url: url
        }
        res.send(dataTraversion)
    })
    }
  })
}

module.exports = {
  getDataScrapping
}
