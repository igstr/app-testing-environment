const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const md5 = require('md5');

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
        "data": {
          account: {
            fullname: doc.fullname,
            email: doc.email
          }
        },
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

router.get('/account', (req, res) => {
  if (req.account) {
    res.send({
      "status": "success",
      "data": {
        email: req.account.email,
        fullname: req.account.fullname
      },
      "message": null
    });
  } else {
    res.send({
      "status": "error",
      "data": null,
      "message": "Client must be logged in to access this data"
    });
  }
});

router.post('/logout/', (req, res) => {
  const sess = req.session;

  if (!sess.identity) {
    res.send({
      "status": "error",
      "data": null,
      "message": "Please login to logout"
    });
  } else {
    sess.destroy();
    res.send({
      "status": "success",
      "data": null,
      "message": null
    });
  }
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
    // Try to save new account
    return new Account({
      fullname: req.body.fullname,
      email: email,
      password: md5(req.body.password)
    })
    .save();
  })
  .then(doc => {
    if (!doc) throw new Error('Account couldn\'t be registered');

    sess.identity = doc._id;
    res.send({
      "status": "success",
      "data": {
        email: doc.email,
        fullname: doc.fullname
      },
      "message": null
    });
  })
  .catch(err => {
    res.send({
      "status": "error",
      "data": null,
      "message": err.msg
    });
  });

});

module.exports = router;
