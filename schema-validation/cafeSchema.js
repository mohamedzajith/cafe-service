const Joi = require("joi");
const _ = require("lodash");
const { validationFailResponse } = require("../utils/response");
const { Cafe, Employee } = require("../models");
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
  description: Joi.string().required().messages({
    "any.required": "Description is required.",
  }),
  logo: Joi.string(),
  location: Joi.string().required().messages({
    "any.required": "Location is required.",
  }),
  employee: Joi.object({
    id: Joi.string()
      .regex(/^UI[a-zA-Z0-9]{7}$/)
      .required()
      .external(async (value, helper) => {
        const employee = await Employee.findById(value);
        const cafeEmployee = await Cafe.find({
          employee: {
            $elemMatch: { id: value },
          },
        });
        if (isEmpty(employee)) {
          return helper.message({
            external: "Employee ID does not exist in the collection.",
          });
        }
        if (!isEmpty(cafeEmployee)) {
          return helper.message({
            external: `Employee already working in (${cafeEmployee[0].name}) cafe.`,
          });
        }
        return value;
      })
      .messages({
        "string.pattern.base":
          'Invalid ID format. It should start with "UI" followed by 7 alphanumeric characters.',
      }),
    start_date: Joi.date().iso().required().messages({
      "date.base": "Invalid date format. Please provide a valid date.",
      "date.format":
        "Invalid date format. The date should be in the format YYYY-MM-DD.",
    }),
  }),
};

const validateCafe = async (req, res) => {
  try {
    const schemaRules = Joi.object().keys(validationSchema);
    return await schemaRules.validateAsync(req.body, options);
  } catch (error) {
    validationFailResponse(res, error, "Validation error");
  }
};

const validateCafeUpdate = async (req, res) => {
  try {
    const dynamicValidation = _.pick(validationSchema, _.keys(req.body));
    const schemaRules = Joi.object().keys(dynamicValidation);
    return await schemaRules.validateAsync(req.body, options);
  } catch (error) {
    validationFailResponse(res, error, "Validation errorsss");
  }
};

module.exports = {
  validateCafe,
  validateCafeUpdate,
};
