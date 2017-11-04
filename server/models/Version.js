const mongoose = require('mongoose')

var versionSchema = new mongoose.Schema({
  lastUrl: String,
},{
  timestamps: true
})

var Version = mongoose.model('Version', versionSchema)

module.exports = Version