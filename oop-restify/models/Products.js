const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cretedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Product", ProductSchema);