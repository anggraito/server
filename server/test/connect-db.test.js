var chai = require('chai')
var chaiHTTP = require('chai-http')
var should = chai.should()
var expect = chai.expect;

chai.use(chaiHTTP)

describe('testing function to create data from scrapping website', function(){
  it('should show the return result from scrapping', function(done){
    chai.request(`http://localhost:3000`)
    .post('/scrapping')
    .send({
      'titleNews': 'kecelakaan motor di jakarta selatan',
      'location': 'jakarta selatan',
      'linksite': 'https://detik.com/kecelakaan',
      'DateofPost': 'Rabu 01 November 2017, 00:16 WIB',
      'Coordinates': '-6.269669, 106.780103'
    })
    .end((err, res) => {
      console.log(res.body);
      res.body.titleNews.should.equal('kecelakaan motor di jakarta selatan')
      res.body.location.should.equal('jakarta selatan')
      res.body.linksite.should.equal('https://detik.com/kecelakaan')
      res.body.DateofPost.should.equal('Rabu 01 November 2017, 00:16 WIB')
      res.body.Coordinates.should.equal('-6.269669, 106.780103')
    })
  })
})
