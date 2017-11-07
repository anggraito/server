const mongoose = require('mongoose')

var accidentDummySchema = new mongoose.Schema({
  linksite: String,
  title: String,
  imgUrl: String,
  addressDetected: String,
  lat: Number,
  lng: Number,
  street: String,
  village: String,
  district: String,
  date: Date,
  valid: String
}, {
    timestamps: true
  })

var AccidentDummy = mongoose.model('AccidentDummy', accidentDummySchema)

module.exports = AccidentDummy