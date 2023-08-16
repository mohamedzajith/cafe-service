const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Employee = require("./Employee");

const db = {
  mongoose,
  Employee,
};

module.exports = db;
