const mongoose = require('mongoose');
require('dotenv').config();
const catalogSchema = new mongoose.Schema({
  catalog_name: { type: String, required: true }, // String is shorthand for {type: String}
  price: { type: String, required: true },
  catalog_picture: { type: String, default: 'not-found.png'},
},
{
  toJSON: {
    virtuals: true
  }
});

catalogSchema.virtual('catalog_picture_link').get(function() {
  return `${process.env.BASE_URL}${this.catalog_picture}`
});

module.exports = catalogSchema;