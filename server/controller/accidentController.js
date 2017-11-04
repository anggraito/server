const Accident = require('../models/Accident')
var distance = require('google-distance')

module.exports = {
  getAccident: function (req, res, next) {
    var lat = Number(req.body.lat)
    var lng = Number(req.body.lng)
    var radius = req.body.radius * 1000  
    // console.log(typeof lat)
    // console.log(lat)
    // console.log(typeof lng)
    // console.log(lng)

    Accident.find({})
      .then(accidents => {
        console.log('accidents.length', accidents.length)
        var result = []
        var counter = 0
        accidents.forEach( accident => {
          console.log('foreach ke')
          // console.log()
          if(accident.lat !== null) {
            distance.get({
              // index: 1,
              origin: `${lat},${lng}`,
              destination: `${accident.lat},${accident.lng}`,
              units: 'kilometers'
            }, function (err, data) {
              if (!err) {
                console.log(`start point coordinate ${lat},${lng}`)
                console.log(`destination coordinate ${accident.lat},${accident.lng}` )
                console.log('data.distanceValue', data.distanceValue)
                console.log('data.distance', data.distance)
                console.log('radius requested', radius)
                console.log('---------------------------------')

                // accidentData = { ...accident }

                // if (data.distanceValue <= radius) {
                //   // accident.dataMaps = data
                  
                //   // accidentData.dataMaps = {
                //   //   distanceValue: data.distanceValue,
                //   //   distance: data.distance,
                //   //   origin: data.origin,
                //   //   destination: data.destination
                //   // }
                //   result.push(accidentData)  
                // }

                // console.log('result', result)
                counter += 1
                console.log(counter)
                console.log('data accident', accident)
                // if (counter === accidents.length) {
                //   // res.send(accidents)
                //   console.log(result)
                //   res.send(result)
                // }
              }
            })
          }
        })
        res.send('ok')
      })
      .catch(err => { res.send(err) })
  }
}