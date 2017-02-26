const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  body: {
    type: String,
    required: true
  },
  answerOptions: [{
    body: {
      type: String
    },
    grade: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  type: {
    type: String,
    enum: [ "checkboxes", "radios", "text" ],
    required: true
  },
  maxGrade: {
    type: Number
  },
  minGrade: {
    type: Number
  }
});

module.exports = mongoose.model('Question', schema);
