const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Account', schema);
