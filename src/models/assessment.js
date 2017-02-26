const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  finalGrade: {
    type: Number
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  answers: {
    type: [{
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
      },
      values: {
        type: [String]
      }
    }]
  }
});

module.exports = mongoose.model('Assessment', schema);
