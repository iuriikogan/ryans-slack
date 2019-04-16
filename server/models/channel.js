const db = require('../db'); // same as ../db.js

const mongoose = require('mongoose');

//creating the schema for channel
const db_channel = db.model('channel', {
    name: {
        type: String,
        required: true
    }
});

model.exports = db_channel;