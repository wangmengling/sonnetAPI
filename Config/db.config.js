// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sonnet');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});