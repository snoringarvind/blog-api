const mongoose = require("mongoose");
require("dotenv/config");

const connection = mongoose.createConnection(
  process.env.DB_String,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("DB_Connected")
);

module.exports = connection;
