const mongoose = require('mongoose');
var db = null;
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then((value) => {
    db = value;
})

module.exports = db;