const mongoose = require('mongoose');
var db = null;
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_STRING).then((value) => {
    db = value;
})

module.exports = db;