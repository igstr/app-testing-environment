const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const accountRouter = require('./account');
const authMiddleware = require('../middleware/auth');

// Use Authentication middleware on all routes
router.use(authMiddleware);

// Use JSON parser on all routes
router.use(bodyParser.json());

// Routes for account management
router.use('/', accountRouter);


module.exports = router;
