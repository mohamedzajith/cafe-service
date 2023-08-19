const Joi = require("joi");
const _ = require("lodash");
const { validationFailResponse } = require("../utils/response");
const {
  MALE,
  FEMALE,
  PHONE_NUMBER_PATTERN,
  EMAIL_PATTERN,
} = require("../utils/constant");
const { Cafe } = require("../models");
const { isEmpty } = require("lodash");

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
  cafe_id: Joi.any()
    .external(async (value, helper) => {
      const cafe = await Cafe.findById(value);
      if (isEmpty(cafe)) {
        return helper.message({
          external: "Cafe does not exist in the collection.",
        });
      }
      return value;
    })
    .messages({
      "any.external": "ID does not exist in the collection.",
    }),
};

const validateEmployee = async (req, res) => {
  try {
    const keyList = ["name", "email_address", "phone_number", "gender"];
    if (req.body.cafe_id) {
      keyList.push("cafe_id");
    }
    const dynamicValidation = _.pick(validationSchema, keyList);
    const schemaRules = Joi.object().keys(dynamicValidation);
    return await schemaRules.validateAsync(req.body, options);
  } catch (error) {
    validationFailResponse(res, error, "Validation errorxxx");
  }
};

const validateEmployeeUpdate = async (req, res) => {
  try {
    const dynamicValidation = _.pick(validationSchema, _.keys(req.body));
    const schemaRules = Joi.object().keys(dynamicValidation);
    return await schemaRules.validateAsync(req.body, options);
  } catch (error) {
    validationFailResponse(res, error, "Validation error");
  }
};

module.exports = {
  validateEmployee,
  validateEmployeeUpdate,
};
