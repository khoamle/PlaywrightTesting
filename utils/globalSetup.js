const dotenv = require('dotenv');

async function globalSetup(config) {
    dotenv.config({
      path: '.env',
      override: true
    });
  }
  
  module.exports = globalSetup;