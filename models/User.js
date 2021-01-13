const mongoose = require("mongoose");
const connection = require("../config/database");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = connection.model("User", UserSchema);

module.exports = UserModel;
