const mongoose = require('mongoose');

/**
 * Authentication middleware. Basically checks if session identity is valid.
 */
const auth = (req, res, next) => {
  const sess = req.session;
  const Account = mongoose.model('Account');

  if (!sess.identity) return next();

  Account.findOne({ _id: sess.identity })
  .exec()
  .then((doc) => {
    if (doc) {
      req.account = doc;
    }
    return next();
  })
  .catch(() => {
    return next();
  });
}

module.exports = auth;
