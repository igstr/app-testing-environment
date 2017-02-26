const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [ "admin", "user" ],
    default: "user"
  }
});

module.exports = mongoose.model('Account', schema);
