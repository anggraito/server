var db = require('../models/Accident')

var createDummy = (req, res) => {
  db.create({
    linksite: req.body.linksite,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    addressDetected: req.body.addressDetected,
    lat: req.body.lat,
    lng: req.body.lng,
    street: req.body.street || null,
    village: req.body.village || null,
    district: req.body.district || null,
    date: req.body.date,
    valid: req.body.valid || null
  })
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {createDummy}