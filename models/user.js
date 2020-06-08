const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
