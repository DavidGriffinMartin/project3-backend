const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  user: String,
  description: String,
  img: String,
  price: Number,
  tags: Array,
  linkto: String
});

const Item = mongoose.model("Post", itemSchema);

module.exports = Item;
