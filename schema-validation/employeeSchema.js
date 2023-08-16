const Joi = require("joi");
const _ = require("lodash");
const { validationFailResponse } = require("../utils/response");
const {
  MALE,
  FEMALE,
  PHONE_NUMBER_PATTERN,
  EMAIL_PATTERN,
} = require("../utils/constant");

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const validationSchema = {
  name: Joi.string().required().messages({
    "any.required": "Name is required.",
  }),
  email_address: Joi.string().regex(EMAIL_PATTERN).required().messages({
    "string.pattern.base": "Invalid email address format.",
    "any.required": "Email is required.",
  }),
  phone_number: Joi.string().regex(PHONE_NUMBER_PATTERN).required().messages({
    "string.pattern.base":
      "Phone number must start with 9 or 8 and have 8 digits.",
    "any.required": "Phone number is required.",
  }),
  gender: Joi.string().valid(MALE, FEMALE).required().messages({
    "any.only": "Invalid Gender value. Must be one of: Male, Female",
    "any.required": "Phone number is required.",
  }),
};

const validateEmployee = async (req, res) => {
  const schemaRules = Joi.object().keys(validationSchema);

  const { error, value } = schemaRules.validate(req.body, options);

  if (error) {
    validationFailResponse(res, error, "Validation error");
  } else {
    return value;
  }
};

const validateEmployeeUpdate = async (req, res) => {
  const dynamicValidation = _.pick(validationSchema, _.keys(req.body));
  const schemaRules = Joi.object().keys(dynamicValidation);

  const { error, value } = schemaRules.validate(req.body, options);

  if (error) {
    validationFailResponse(res, error, "Validation error");
  } else {
    return value;
  }
};

module.exports = {
  validateEmployee,
  validateEmployeeUpdate,
};
