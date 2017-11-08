const mongoose = require('mongoose')

var accidentSchema = new mongoose.Schema({
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

var Accident = mongoose.model('Accident', accidentSchema)

module.exports = Accident