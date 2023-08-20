const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social-api'); 

module.exports = mongoose.connection;
