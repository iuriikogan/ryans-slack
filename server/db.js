const db_url = 'mongodb://localhost:27017';
const db_name = 'slack';

const mongoose = require('mongoose');

mongoose.connect(`${db_url}/${db_name}`, { useNewUrlParser: true }, function() {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;