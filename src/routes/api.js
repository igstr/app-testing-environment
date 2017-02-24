const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/auth');
const accountRouter = require('./account');
const testRouter = require('./test');

// Use Authentication middleware on all routes
router.use(authMiddleware);

// Use JSON parser on all routes
router.use(bodyParser.json());

// Routes for account management
router.use('/', accountRouter);

// Routes for tests management
router.use('/test', testRouter);

module.exports = router;
