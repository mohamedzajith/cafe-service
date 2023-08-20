const { Cafe } = require("../models/index");
const { generateQuery } = require("../utils/queryBuilder");
const {
  validateCafe,
  validateCafeUpdate,
} = require("../schema-validation/cafeSchema");
const { cafeDefinition } = require("../models/definitions/cafe");
const { generateUuid } = require("../utils/helper");
const { get, map, size, } = require("lodash");

const listOfCafe = async (req, res) => {
  try {
    const query = generateQuery(req, cafeDefinition);
    const cafes = await Cafe.aggregate([
      // {
      //   $lookup: {
      //     from: "employee",
      //     localField: "employee.id",
      //     foreignField: "id",
      //     as: "employeeDetails",
      //   },
      // },
      {
        $match: query,
      },
    ])

    return map(cafes, ({_id, employee, ...rest }) => {
      return { ...rest, employees: size(employee) };
    });
  } catch (error) {
    console.error(error);
  }
};

const findCafe = async (req, res) => {
  try {
    const id = get(req, "params.id") || get(req, "body.id");
    return await Cafe.findById(id);
  } catch (error) {
    console.error(error);
  }
};

const updateCafe = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const value = await validateCafeUpdate(req, res);
    await Cafe.findByIdAndUpdate(id, value);
    return await findCafe(req);
  } catch (error) {
    console.error(error);
  }
};

const updateCafeEmployee = async (req, res) => {
  try {
    const {
      body: { id, employee },
    } = req;
    await validateCafeUpdate(req, res);
    await Cafe.findByIdAndUpdate(id, { $push: { employee: employee } });
    return await findCafe(req);
  } catch (error) {
    console.error(error);
  }
};

const removeCafe = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    await Cafe.deleteOne({ _id: id });
    return await findCafe(req);
  } catch (error) {
    console.error(error);
  }
};

const createCafe = async (req, res) => {
  try {
    const value = await validateCafe(req, res);
    const id = generateUuid();
    const data = {
      ...value,
      _id: id,
      id,
    };
    return await new Cafe(data).save();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  findCafe,
  createCafe,
  listOfCafe,
  updateCafe,
  removeCafe,
  updateCafeEmployee,
};
