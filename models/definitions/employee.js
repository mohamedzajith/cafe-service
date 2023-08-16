const { Schema } = require("mongoose");
const {
  MALE,
  FEMALE,
  PHONE_NUMBER_PATTERN,
  EMAIL_PATTERN,
} = require("../../utils/constant");

const Employee = {
  _id: { type: String },
  id: { type: String, unique: true },
  name: { type: String, required: true },
  email_address: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return EMAIL_PATTERN.test(v);
      },
      message: "Invalid email address format.",
    },
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return PHONE_NUMBER_PATTERN.test(v);
      },
      message: "Phone number must start with 9 or 8 and have 8 digits.",
    },
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: [MALE, FEMALE],
      message: "Invalid gender value. Must be one of: Male, Female",
    },
  },
};

module.exports = {
  employeeDefinition: Employee,
};
