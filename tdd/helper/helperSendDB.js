const Accident = require('../models/Accident')
const Version = require('../models/Version')

function writeDB (arrayData) {
  var recentVersion = ''
  // Version.findOne({}, {}, { sort: { 'createdAt' : -1}})
  //   .then(data => {
  //     recentVersion = data.lastUrl
  //     console.log('recentVersion', recentVersion)
  //   })
  //   .catch(err => {console.log('error version db', err)})

  arrayPromise = []
  arrayData.forEach(data => {
    var hasil = send(data)
    arrayPromise.push(hasil)
  })
  Promise.all(arrayPromise)
    .then(arrayResult => {
      console.log('arrayResult di helper', arrayResult)
      return arrayResult
    })
    .catch(err => { return err })
  
}

function send (data) {
  return promise = new Promise ((resolve, reject) => {
    console.log('promise')
      Accident.create({
        linksite: data[0].linksite,
        addressDetected: data[0].addressDetected,
        lat: data[0].lat,
        lng: data[0].lng,
        street: data[0].name,
        village: data[0].village,
        district: data[0].district
      })
        .then(accident => {
          // console.log('accident', accident)
          resolve(accident)
        }).catch(err => {
          reject(err)
        })
  })

  
}

module.exports = {
  writeDB,
  send
}