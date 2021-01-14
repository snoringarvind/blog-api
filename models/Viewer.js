const mongoose = require("mongoose");
const connection = require("../config/database");

const ViewerSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const ViewerModel = connection.model("Viewer", ViewerSchema);

module.exports = ViewerModel;
