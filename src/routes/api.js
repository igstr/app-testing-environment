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

router.post('/register/', (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const Account = mongoose.model('Account');
  const sess = req.session;
  const email = req.body.email.toLowerCase();

  new Promise((resolve, reject) => {
    // Check if request data is valid
    if (req.body.password != req.body.passwordConfirm) {
      reject({
        data: null,
        msg: "Invalid request data. Passwords do not match"
      });
    } else {
      resolve();
    }
  })
  .then(() => {
    // Check if there's an account with such email
    return new Promise((resolve, reject) => {
      Account.findOne({ email: email })
      .exec()
      .then((doc) => {
        if (doc) {
          reject({
            data: null,
            msg: "Such account allready exists"
          });
        } else {
          resolve();
        }
      });
    });
  })
  .then(() => {
    // Try to register new account
    const account = new Account({
      fullname: req.body.fullname,
      email: email,
      password: md5(req.body.password)
    });

    return new Promise((resolve, reject) => {
      account.save((err, result) => {
        if (err) {
          reject({
            data: null,
            msg: "Account couldn't be registered"
          });
        } else {
          resolve(result);
        }
      });
    });
  })
  .then((result) => {
    sess.identity = result.identity;
    res.send({
      "status": "success",
      "data": null,
      "message": null
    });
  })
  .catch((err) => {
    res.send({
      "status": "error",
      "data": err.data,
      "message": err.msg
    });
  });

});

module.exports = router;
