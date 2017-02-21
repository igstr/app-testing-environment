const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// Use JSON parser on all routes
router.use(bodyParser.json());

router.post('/login/', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  res.send(req.body);
});

module.exports = router;
