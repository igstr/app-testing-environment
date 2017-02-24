const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: -1
  },
  questions: {
    type: [Schema.Types.ObjectId]
  },
  randomized: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Test', schema);
