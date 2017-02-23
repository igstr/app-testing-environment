const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const accountRouter = require('./account');

// Use JSON parser on all routes
router.use(bodyParser.json());

// Routes for account management
router.use('/', accountRouter);


module.exports = router;
