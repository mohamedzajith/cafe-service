const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Employee = require("./Employee");
const Cafe = require("./Cafe");

const db = {
  mongoose,
  Employee,
  Cafe,
};

module.exports = db;
