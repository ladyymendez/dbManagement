const mongoose = require('mongoose');
const config = require('config');

const connect = () => (
  mongoose.connect(
    config.db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
);

module.exports = connect;
