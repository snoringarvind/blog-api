const mongoose = require("mongoose");
const connection = require("../config/database");

const BlogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BlogModel = connection.model("Blog", BlogSchema);

module.exports = BlogModel;
