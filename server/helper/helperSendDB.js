const Accident = require('../models/Accident')
const Version = require('../models/Version')

function send (data) {
  return promise = new Promise ((resolve, reject) => {
    console.log('promise')
      Accident.create({
        linksite: data[0].linksite,
        title: data[0].title,
        imgUrl: data[0].imgUrl,
        addressDetected: data[0].addressDetected,
        lat: data[0].lat,
        lng: data[0].lng,
        street: data[0].name,
        village: data[0].village,
        district: data[0].district
      })
        .then(accident => {
          resolve(accident)
        }).catch(err => {
          reject(err)
        })
  })
  
}

module.exports = {
  send
}