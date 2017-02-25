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
    const msg = req.params.id ? 'Couldn\'t retrieve test' : 'Couldn\'t retrieve tests';
    res.status(500).send({
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

module.exports = router;
