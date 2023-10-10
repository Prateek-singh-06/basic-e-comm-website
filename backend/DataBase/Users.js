const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: String,
  userName: String,
  userEmail: String,
  userPassword: String,
});

module.exports = mongoose.model("users", UserSchema);
