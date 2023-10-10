const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  ProductName: String,
  userid: String,
  ProductPrice: Number,
  ProductCategory: String,
  ProductCompany: String,
});

module.exports = mongoose.model("e-products", ProductSchema);
