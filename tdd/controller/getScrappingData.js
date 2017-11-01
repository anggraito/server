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

module.exports = {
  getDataScrapping
}
