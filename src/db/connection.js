const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (!process.env.MONGODB_URI) {
  throw new Error('Missing environment variable: MONGODB_URI');
}

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    // Bind errors to error stream
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error:'));
  },
  err => {
    throw err;
  }
);

// Close the Mongoose connection on Control+C
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

// Let mongoose store all models
require('../models/account');
require('../models/test');
