const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  location: String,
  time: String,
  hospitalStay: Number,
  mriUnits: Number,
  ctScanners: Number,
  hospitalBeds: Number
});

module.exports = mongoose.model('Investment', investmentSchema);
