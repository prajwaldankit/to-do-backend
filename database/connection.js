const mongoose = require("mongoose");
const env = require('dotenv');
env.config();

const startConnection = function () {
  mongoose
    .connect(
      process.env.DB_LOCATION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(result => {
      console.log("Mongoose is connected");
    })
    .catch(err => {
      console.log("Mongoose connection unsuccessful");
    });
};

module.exports = {
  start: startConnection
};
