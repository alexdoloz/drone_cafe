const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/dc_test');

mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});