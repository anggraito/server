var chai = require('chai')
var chaiHTTP = require('chai-http')
var should = chai.should()
var expect = chai.expect;

var axios = require('axios')
var request = require('request')
var cheerio = require('cheerio')
var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('aef962244988878095f0e5b0dcb92650')
var key = 'trnsl.1.1.20171102T082906Z.c7ef21f2243b58fa.e2d6b8c0d19167f66782dbf27d689502e5384d03'

chai.use(chaiHTTP)

describe('Testing function to create data from scrapping website', function(){
  it('should return result from scrapping is Array', function (done) {
    var url = 'http://www.tribunnews.com/tag/kecelakaan?page=1'
    request(url, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body)
        var linksite
        var urlArr = []
        $('.mr140 a').each(function (i, element) {
          linksite = $(this).attr('href')
          dataTraversion = {
            url: linksite
          }
          urlArr.push(dataTraversion)
          return urlArr
        })
        expect(urlArr).to.be.an('array')
        done()
      }
    })
  })
  it('should return data type of array of object and has property url', function (done) {
    var url = 'http://www.tribunnews.com/tag/kecelakaan?page=1'
    request(url, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body)
        var linksite
        var urlArr = []
        $('.mr140 a').each(function (i, element) {
          linksite = $(this).attr('href')
          dataTraversion = {
            url: linksite
          }
          urlArr.push(dataTraversion)
          return urlArr
        })
        expect(urlArr[0]).to.have.property('url')
        done()
      }
    })
  })
  it('should return 29 length of array of object and has property url', function (done) {
    var url = 'http://www.tribunnews.com/tag/kecelakaan?page=1'
    request(url, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body)
        var linksite
        var urlArr = []
        $('.mr140 a').each(function (i, element) {
          linksite = $(this).attr('href')
          dataTraversion = {
            url: linksite
          }
          urlArr.push(dataTraversion)
          return urlArr
        })
        expect(urlArr).to.to.be.an('array').with.length(29)
        done()
      }
    })
  })
})

describe('Test get content from url from scrapping using cheerio', function(){
  // this.timeout(20000)
  it('Should return result of scrapping the url is Array of Object', function(done){
    var counter = 0
    var arrNewsData = []
    var articleUrl = [
      {
        url: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk'
      }
    ]

    articleUrl.forEach(articleData => {
      diffbot.article({
        url: `${articleData.url}`
      }, function(err, response){
        article = response.objects[0].text.replace(/[^a-zA-Z0-9.,]/g, " ").replace(/\s+/gm, ' ')
        article = article.replace(/kecamatan/gi, 'district')
        data = {
          linksite: articleData.url,
          news: article
        }

        arrNewsData.push(data)
        counter += 1

        if (counter === articleUrl.length) {
          return arrNewsData
        }
      })
    })
    expect(arrNewsData).to.be.an('array')
    // setTimeout(done, 6000)
    done()
  })
  it('Should has property linksite', function (done) {
    var counter = 0
    var arrNewsData = []
    var articleUrl = [
      {
        url: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk'
      }
    ]

    articleUrl.forEach(articleData => {
      diffbot.article({
        url: `${articleData.url}`
      }, function (err, response) {
        article = response.objects[0].text.replace(/[^a-zA-Z0-9.,]/g, " ").replace(/\s+/gm, ' ')
        article = article.replace(/kecamatan/gi, 'district')
        data = {
          linksite: articleData.url,
          news: article
        }

        arrNewsData.push(data)
        counter += 1

        if (counter === articleUrl.length) {
          //console.log(arrNewsData)
          return arrNewsData
          expect(arrNewsData[0]).to.have.property('linksite')
        }
      })
    })
    // setTimeout(done, 6000)
    done()
  })
  it('Should has property news', function (done) {
    var counter = 0
    var arrNewsData = []
    var articleUrl = [
      {
        url: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk'
      }
    ]

    articleUrl.forEach(articleData => {
      diffbot.article({
        url: `${articleData.url}`
      }, function (err, response) {
        article = response.objects[0].text.replace(/[^a-zA-Z0-9.,]/g, " ").replace(/\s+/gm, ' ')
        article = article.replace(/kecamatan/gi, 'district')
        data = {
          linksite: articleData.url,
          news: article
        }

        arrNewsData.push(data)
        counter += 1

        if (counter === articleUrl.length) {
          //console.log(arrNewsData)
          return arrNewsData
          expect(arrNewsData[0]).to.have.property('news')
        }
      })
    })
    // setTimeout(done, 6000)
    done()
  })
  it('Should has property linksite that has type of string', function (done) {
    var counter = 0
    var arrNewsData = []
    var articleUrl = [
      {
        url: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk'
      }
    ]

    articleUrl.forEach(articleData => {
      diffbot.article({
        url: `${articleData.url}`
      }, function (err, response) {
        article = response.objects[0].text.replace(/[^a-zA-Z0-9.,]/g, " ").replace(/\s+/gm, ' ')
        article = article.replace(/kecamatan/gi, 'district')
        data = {
          linksite: articleData.url,
          news: article
        }

        arrNewsData.push(data)
        counter += 1

        if (counter === articleUrl.length) {
          //console.log(arrNewsData)
          return arrNewsData
          expect(arrNewsData[0]).to.have.property('linksite').to.be.an('string')
        }
      })
    })
    // setTimeout(done, 6000)
    done()
  })
  it('Should has property news that has type of string', function (done) {
    var counter = 0
    var arrNewsData = []
    var articleUrl = [
      {
        url: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton'
      },
      {
        url: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk'
      }
    ]

    articleUrl.forEach(articleData => {
      diffbot.article({
        url: `${articleData.url}`
      }, function (err, response) {
        article = response.objects[0].text.replace(/[^a-zA-Z0-9.,]/g, " ").replace(/\s+/gm, ' ')
        article = article.replace(/kecamatan/gi, 'district')
        data = {
          linksite: articleData.url,
          news: article
        }

        arrNewsData.push(data)
        counter += 1

        if (counter === articleUrl.length) {
          //console.log(arrNewsData)
          return arrNewsData
          expect(arrNewsData[0]).to.have.property('news').to.be('string')
        }
      })
    })
    // setTimeout(done, 6000)
    done()
  })
})

describe('Test translate news content using YANDEX', function(){
  it('Should return data type of array of object', function(done){
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            return arrTranslate
            expect(arrTranslate).to.be('array')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('Should have property linksite', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0]).to.have.property('linksite')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('Should have property text thats will return the translation fron id to en', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0]).to.have.property('text')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('On property text it should have property code that has value 200 as success translate', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0].text).to.have.property('code')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('On property text should have property lang with value id-en that approve it translate from Indonesia to English', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0].text).to.have.property('lang').to.equal('id-en')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('On text property should have property text with value type of array that as result of translation', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0].text).to.have.property('text').to.be.an('array')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('On property linksite it should have value type of String', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0]).to.have.property('linksite').to.be.an('string')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('On property text it should have property text that has value type of String', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0].text).to.have.property('code').to.be.an('number')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
  it('On property text it should have property that has value type of String', function (done) {
    var scrapData = [{
      linksite: 'http://www.tribunnews.com/regional/2017/11/03/tubuh-abdul-hafid-digilas-ban-truk-tronton',
      news: 'Net Laporan Wartawan TribunKaltim.co, Margaret Sarita TRIBUNNEWS.COM, SANGATTA Abdul Hafid, warga RT 5 Desa Sangkima, district Sangatta Selatan, tewas akibat terlindas roda belakang sebelah kanan truk tronton. Kapolres Kutim AKBP Rino Eko didampingi Kasatlantas AKP Eko Budiatno mengatakan peristiwa lakalantas antara kendaraan roda dua dan truk tronton terjadi setelah almarhum menyalip kendaraan tronton yang berada di depannya. Kedua kendaraan sama sama dari arah Bontang menuju Sangatta. Di Km 34, Desa Sangkima, almarhum menyalip truk dari sebelah kanan, kata Eko, Jumat 3 11 2017 . Baca Tiga Jalan di Kediri Dianggap Angker dan Rawan Kecelakaan, Hati hati Jika Melintasinya Tapi, kata dia karena cukup laju, kendaraannya oleng dan terjatuh ke jalan, kemudian terlindas ban belakang sebelah kanan tronton tersebut. Kendaraan roda dua KT 2293 RAL dan truk tronton KT 8942 RL yang dikemudikan As kini diamankan polisi.'
    },
    {
      linksite: 'http://www.tribunnews.com/regional/2017/11/02/akibat-kendarai-motor-dalam-kondisi-mabuk',
      news: 'youtube TRIBUNNEWS.COM, NEGARA I Gede Arimbawa 20 membonceng rekannya, I Gede Ari Wira Buana 19 , naik sepeda motor dalam kondisi mabuk, Rabu 1 11 2017 Saat melintas di jalan pedesaan, Banjar Ketiman Kelod, Desa Manistutu, district Melaya, motor Yamaha MioSoul yang mereka tumpangi oleng dan menabrak pengendara lain bernama I Putu Eka Adnyana 30 . Kejadian itu mengundang perhatian warga setempat. Motor yang dikemudikan Arimbawa ringsek di bagian depan. Velg depan bengkok hingga nyaris menyentuh bagian mesin motor . Sepeda motor Honda Vario yang dikemudikan Adnyana juga ringsek. Kasat Lantas Polres Jembrana, AKP I Nyoman Sukadana membenarkan adanya kecelakan tersebut. Polisi datang ke TKP. Meskipun benturannya keras, namun dipastikan tak ada korban jiwa. Arimbawa pingsan. Ia mengalami robek pada bagian dahi, mata kirinya bengkak. Adnyana juga mengalami nasib serupa. Keduanya dilarikan ke RSUD Negara. Sedangkan, Wira Buana diketahui mengalami lecet pada bagian dahi. Tapi masih sadar. Penyebab kecelakaan ini diduga karena pemotor Mio dalam keadaanmabuk saat berkendara, terang Sukadana ketika dikonfirmasi. '
    },
    {
      linksite: 'http://www.tribunnews.com/seleb/2017/11/03/pesan-terakhir-kim-joo-hyuk-bikin-kru-dan-member-2-days-1-night-berurai-air-mata',
      news: 'soompi.com Laporan Wartawan Grid.ID, Nindya Galuh A. TRIBUNNEWS.COM Masih terasa duka di hati para sahabat, keluarga dan fans Kim Joo Hyuk. Kematian Kim Joo Hyuk yang cukup tragis membuat semua orang terkejut dan tak percaya. Pada Kamis 2 11 2017 Aktor KimJoo Hyuk dimakamkan di pemakaman keluarga di wilayah Chungnam. Beberapa waktu yang lalu, sebelum kematian Kim Joo Hyuk, sang aktor pernah memberikan kesan dan pesan untuk sahabat sahabatnya di variety show 2 Days 1 Night. Dilansir Grid.ID dari Koreaboo, setelah keluar dari 2 Days 1 Night Kim Joo Hyuk pernah sekali hadir sebagai tamu istimewa. Ternyata itu adalah penampilan terakhirnya bersama para sahabat di program 2 Days 1 Night. Ia membuat kejutan dengan memakai kostum badut berwarna ungu di bawah sebuah pohon. Bahkan momen itu ia abadikan dan dijadikan foto profil akun Kakaotalk pribadinya. Para member dan kru 2 Days 1 Night kaget saat tahu orang di balik kostum tersebut adalah Kim Joo Hyuk. soompi.com Mereka sangat senang dan rindu dengan sang aktor yang sudah lama tak muncul di lokasi syuting 2 Days 1 Night. Di akhir acara, semua member dan kru tampak menangis haru karena Kim Joo Hyuk tak bisa lagi ikut serta di program mereka. Para staff dan member 2 Days 1 Night memang dikenal sangat dekat seperti keluarga. Sebelum berpisah, Kim Joo Hyuk sempat memberikan pesan terakhirnya untuk para sahabatnya itu. Ada satu hal yang ku sadari dari 2 Days 1 Night yaitu para member dan para staf.Kalian semua adalah orang yang paling baik yang pernah kutemui dalam proyekku sejauh ini, ucak Kim Joo Hyuk yang membuat semua orang terharu. Para staf kembali terlihat menangis mendengarkan pesan Kim Joo Hyuk itu. Kini sang aktor benar benar sudah pergi meninggalkanpara sahabat selamanya. Namun, semua fans dan sahabatnya tidak akan pernah melupakan aktor yang meninggal di usia 45 tahun ini. Selamat jalan Kim Joo Hyuk. Nindya Galuh A Grid.id '
    }]
    //var key = 'trnsl.1.1.20170824T120724Z.9356bcdc324c8661.ac1287eb09250e795cc078f79a333c5269b6b540'
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
          counter += 1
          if (counter === scrapData.length) {
            //console.log(arrTranslate)
            return arrTranslate
            expect(arrTranslate[0].text).to.have.property('lang').to.be.an('string')
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    done()
  })
})

describe('Testing server connection for GET event', function () {
  it('Should return data as array of object', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('Should have property _id that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('_id').to.be.a('string')
        done()
      })
  })
  it('Should have property linksite that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('linksite').to.be.a('string')
        done()
      })
  })
  it('Should have property title that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('title').to.be.a('string')
        done()
      })
  })
  it('Should have property imgUrl that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('imgUrl').to.be.a('string')
        done()
      })
  })
  it('Should have property addressDetected that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('addressDetected').to.be.a('string')
        done()
      })
  })
  it('Should have property lat that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('lat').to.be.a('number')
        done()
      })
  })
  it('Should have property lng that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('lng').to.be.a('number')
        done()
      })
  })
  it('Should have property street that type of string', function (done) {
    chai.request('http://35.185.184.137')
      .get('/api/accident')
      .end((err, res) => {
        expect(res.body[0]).to.have.property('street').to.be.a('string')
        done()
      })
  })
})

describe('Testing server response for POST event', function(){
  this.timeout(20000)
  it('Should return data type array of object', function (done) {
    chai.request('http://35.185.184.137')
      .post('/api/accident')
      .send({
        'lat': -7.023318100000001,
        'lng': 107.8944572,
        'radius': 10
      })
      .end((err, res) => {
        //console.log('====>',res.body)
        expect(res.body).to.be.a('array')
        setTimeout(done, 6000)
      })
  })
  it('Should have property accident that has data type of object', function (done) {
    chai.request('http://35.185.184.137')
      .post('/api/accident')
      .send({
        'lat': -7.023318100000001,
        'lng': 107.8944572,
        'radius': 10
      })
      .end((err, res) => {
        // console.log('====>',res.body[0])
        var data = res.body[0]
        data.should.be.an('object')
        done()
      })
  })
  it('Should have property accident', function (done) {
    chai.request('http://35.185.184.137')
      .post('/api/accident')
      .send({
        'lat': -7.023318100000001,
        'lng': 107.8944572,
        'radius': 10
      })
      .end((err, res) => {
        // console.log('====>',res.body[0])
        var data = res.body[0]
        data.should.have.property('accident')
        done()
      })
  })
  it('Should have property dataMaps', function (done) {
    chai.request('http://35.185.184.137')
      .post('/api/accident')
      .send({
        'lat': -7.023318100000001,
        'lng': 107.8944572,
        'radius': 10
      })
      .end((err, res) => {
        // console.log('====>',res.body[0])
        var data = res.body[0]
        data.should.have.property('dataMaps')
        done()
      })
  })
  it('On property accident should have property _id, linksite, title, imgUrl, addressDetected, lat, lng, street', function (done) {
    chai.request('http://35.185.184.137')
      .post('/api/accident')
      .send({
        'lat': -7.023318100000001,
        'lng': 107.8944572,
        'radius': 10
      })
      .end((err, res) => {
        // console.log('====>',res.body[0])
        var data = res.body[0].accident
        data.should.have.property('_id')
        data.should.have.property('linksite')
        data.should.have.property('title')
        data.should.have.property('imgUrl')
        data.should.have.property('addressDetected')
        data.should.have.property('lat')
        data.should.have.property('lng')
        data.should.have.property('street')
        done()
      })
  })
  it('On property dataMaps should have property distanceValue, distance, origin, destination', function (done) {
    chai.request('http://35.185.184.137')
      .post('/api/accident')
      .send({
        'lat': -7.023318100000001,
        'lng': 107.8944572,
        'radius': 10
      })
      .end((err, res) => {
        // console.log('====>',res.body[0])
        var data = res.body[0].dataMaps
        data.should.have.property('distanceValue')
        data.should.have.property('distance')
        data.should.have.property('origin')
        data.should.have.property('destination')
        done()
      })
  })
})