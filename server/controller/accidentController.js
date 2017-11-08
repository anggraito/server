const Accident = require('../models/Accident')
var distance = require('google-distance')

module.exports = {
  getAccident: function (req, res, next) {
    var lat = Number(req.body.lat)
    var lng = Number(req.body.lng)
    var radius = req.body.radius * 1000  

    Accident.find({})
      .then(accidents => {
        console.log('accidents.length', accidents.length)
        var result = []
        var counter = 0
        var arrPromise = []

        accidents.forEach( accident => {
          counter += 1
          console.log('foreach ke', counter)
          
          if(accident.lat !== null) {
            var promise = getDistance(accident, lat, lng)
            arrPromise.push(promise)
          }
        })

        console.log('arrPromise', arrPromise)
        console.log('arrPromise.length', arrPromise.length)
        Promise.all(arrPromise)
          .then(results => {
            hasilNotNull = results.filter(result => result.dataMaps !== null)
            hasilAkhir = hasilNotNull.filter(hasil => hasil.dataMaps.distanceValue <= radius)
            res.send(hasilAkhir) // []
          })
      
      })
      .catch(err => { res.send(err) })
  },
  getRawDataAccident: function (req, res, next) {
    Accident.find({})
      .then(accidents => { res.send(accidents) })
      .catch(err => { res.send(err) })
  },
  update: function (req, res, next) {
    console.log('valid : ', req.body.valid)
    Accident.findOneAndUpdate({
      _id: req.params._id
    }, {
        addressDetected: req.body.addressDetected,
        lat: req.body.lat,
        lng: req.body.lng,
        valid: req.body.valid || null
      })
      .then(dataUpdated => {
        res.send(dataUpdated)
      })
      .catch(err => { res.send(err) })
  },
  getOne: function (req, res, next) {
    Accident.findOne({ linksite: req.body.url })
      .then(accident => {
        console.log('accident', accident)
        res.send({accident: accident})
      })
      .catch(err => {
        console.log('err', err)
        res.send(err)
      })
  }
}

function getDistance (accident, lat, lng) {
  return promise = new Promise ((resolve, reject) => {
    distance.get({
      origin: `${lat},${lng}`,
      destination: `${accident.lat},${accident.lng}`,
      units: 'kilometers'
    }, function (err, data) {
      if (!err) {
        dataMaps = {
            distanceValue: data.distanceValue,
            distance: data.distance,
            origin: data.origin,
            destination: data.destination
        }
        resolve({
          accident: accident,
          dataMaps: dataMaps
        })
      } else {
        dataMaps = null
        resolve({
          accident: accident,
          dataMaps: dataMaps // null
        })
      }
    })
  })
}