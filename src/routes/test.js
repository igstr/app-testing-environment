const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/:id?', (req, res) => {
  const Test = mongoose.model('Test');
  const findConditions = req.params.id ? { _id: req.params.id } : {};

  Test.find(findConditions)
  .select({ questions: 0, __v: 0 })
  .exec()
  .then((docs) => {
    const data = req.params.id ? docs[0] : docs;
    res.send({
      "status": "success",
      "data": data,
      "message": null
    });
  })
  .catch((err) => {
    const msg = req.params.id ? 'Couldn\'t retrieve test. Please try again later.' : 'Couldn\'t retrieve tests';
    res.send({
      "status": "error",
      "data": null,
      "message": msg
    });
  });
});

router.put('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      "status": "error",
      "data": null,
      "message": "Missing request body."
    });
  }

  if (!req.account) {
    return res.status(401).send({
      "status": "error",
      "data": null,
      "message": "Client must be logged in to create new tests."
    });
  }

  if ("admin" != req.account.role) {
    return res.status(401).send({
      "status": "error",
      "data": null,
      "message": "Client is not authorized to create new tests."
    });
  }

  const Test = mongoose.model('Test');
  const test = new Test({
    title: req.body.title,
    duration: req.body.duration,
    questions: req.body.questions,
    randomized: req.body.randomized
  })
  .save()
  .then((doc) => {
    res.send({
      "status": "success",
      "data": null,
      "message": null
    });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({
        "status": "error",
        "data": null,
        "message": "Invalid request data"
      });
    } else {
      return res.status(500).send({
        "status": "error",
        "data": null,
        "message": "Test couldn't be saved"
      });
    }
  });

});

router.get('/:testId/question', (req, res) => {
  const Test = mongoose.model('Test');

  Test.findOne({ _id: req.params.testId })
  .select({ _id: 0, questions: 1 })
  .populate('questions')
  .exec()
  .then((doc) => {
    if (!doc) throw new Error();
    res.send({
      "status": "success",
      "data": doc.questions,
      "message": null
    });
  })
  .catch((err) => {
    const msg = 'Couldn\'t retrieve test\'s questions.';
    res.send({
      "status": "error",
      "data": null,
      "message": msg
    });
  });
});

router.put('/:testId/question', (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      "status": "error",
      "data": null,
      "message": "Missing request body."
    });
  }

  if (!req.account) {
    return res.status(401).send({
      "status": "error",
      "data": null,
      "message": "Client must be logged in to create new questions."
    });
  }

  if ("admin" != req.account.role) {
    return res.status(401).send({
      "status": "error",
      "data": null,
      "message": "Client is not authorized to create new questions."
    });
  }

  const Question = mongoose.model('Question');
  const Test = mongoose.model('Test');

  Test.findById(req.params.testId)
  .select({ _id: 1 })
  .exec()
  .then((doc) => {
    if (!doc) throw new Error("Test not found");

    return new Question({
      body: req.body.body,
      answerOptions: req.body.answerOptions,
      type: req.body.type,
      maxGrade: req.body.maxGrade,
      minGrade: req.body.minGrade
    }).save();
  })
  .then(doc => {
    if (!doc) throw new Error("Question could not be saved");

    return Test.findByIdAndUpdate(
      req.params.testId,
      { $push: { questions: doc._id }}
    ).exec();
  })
  .then(doc => {
    if (!doc) throw new Error("Created question couldn't be attached to test");
    res.send({
      "status": "success",
      "data": { id: doc._id },
      "message": null
    });
  })
  .catch(mongoose.Error.ValidationError, (err) => {
    res.status(400).send({
      "status": "error",
      "data": null,
      "message": "Invalid request data"
    });
  })
  .catch((err) => {
    res.status(500).send({
      "status": "error",
      "data": null,
      "message": "Question could not be created"
    });
  });

});

module.exports = router;
