const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const md5 = require('md5');

// Use JSON parser on all routes
router.use(bodyParser.json());

router.post('/login/', (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const Account = mongoose.model('Account');
  const sess = req.session;
  const email = req.body.email.toLowerCase();

  Account.findOne({
    email: email,
    password: md5(req.body.password)
  })
  .exec()
  .then((doc) => {
    if (doc) {
      sess.identity = doc._id;
      res.send({
        "status": "success",
        "data": null,
        "message": null
      });
    } else {
      res.send({
        "status": "error",
        "data": null,
        "message": "Incorrect account email or password"
      });
    }
  });

});

module.exports = router;
