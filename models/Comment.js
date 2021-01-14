const mongoose = require("mongoose");

const Comments = mongoose.Schema({
  comment: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Viewer" },
});
