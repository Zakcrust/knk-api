const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:  {type: String, required: true, unique: true}, // String is shorthand for {type: String}
  password: { type: String, required: true, select: false },
});

module.exports = userSchema;