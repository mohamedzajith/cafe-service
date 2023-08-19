const mongoose = require("mongoose");

const Cafe = {
  _id: { type: String },
  id: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  location: { type: String, required: true },
  employee: [
    {
      id: { type: mongoose.Schema.Types.String, ref: "employee" },
      start_date: { type: String },
    },
  ],
};

module.exports = {
  cafeDefinition: Cafe,
};
