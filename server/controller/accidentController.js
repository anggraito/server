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
            res.send(hasilAkhir)
          })
      
      })
      .catch(err => { res.send(err) })
  }
}

function getDistance (accident, lat, lng) {
  return promise = new Promise ((resolve, reject) => {
    distance.get({
      // index: 1,
      origin: `${lat},${lng}`,
      destination: `${accident.lat},${accident.lng}`,
      units: 'kilometers'
    }, function (err, data) {
      if (!err) {
        // console.log(`start point coordinate ${lat},${lng}`)
        // console.log(`destination coordinate ${accident.lat},${accident.lng}` )
        // console.log('data.distanceValue', data.distanceValue)
        // console.log('data.distance', data.distance)
        // // console.log('radius requested', radius)
        // console.log('---------------------------------')

        // accidentData = { ...accident }
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
        // if (data.distanceValue <= radius) {
          // accident.dataMaps = data

          // accidentData.dataMaps = {
          //   distanceValue: data.distanceValue,
          //   distance: data.distance,
          //   origin: data.origin,
          //   destination: data.destination
          // }
          // result.push(accidentData)  
        // }

        // console.log('result', result)
        // counter += 1
        // console.log(counter)
        // console.log('data accident', accident)
        // if (counter === accidents.length) {
        //   // res.send(accidents)
        //   console.log(result)
        //   res.send(result)
        // }
      } else {
        console.log('data error ================')
        // console.log(err)
        console.log(accident)
        console.log('==========================')
        accidentData = { ...accident }
        dataMaps = null
        resolve({
          accident: accident,
          dataMaps: dataMaps
        })
      }
    })
  })
}