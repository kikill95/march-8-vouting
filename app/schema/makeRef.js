const mongoose = require('mongoose')

module.exports = reference => ({
  type: mongoose.Schema.ObjectId,
  required: true,
  ref: reference
})
