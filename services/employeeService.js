const { validateEmployee, validateEmployeeUpdate } = require("../schema-validation/employeeSchema");
const { Employee } = require("../models/index");
const { generateQuery, generateOptions } = require("../utils/queryBuilder");
const { employeeDefinition } = require("../models/definitions/employee");
const { uniqueId } = require("../utils/helper");

const listOfEmployee = async (req, res) => {
  try {
    const query = generateQuery(req, employeeDefinition);
    const option = generateOptions(req);
    return await Employee.paginate(query, {
      ...option
    });
  } catch (error) {
    console.error(error);
  }
};

const findEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    return await Employee.findById(id);
  } catch (error) {
    console.error(error);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const value = await validateEmployeeUpdate(req, res);
    await Employee.findByIdAndUpdate(id, value);
    return await findEmployee(req);
  } catch (error) {
    console.error(error);
  }
};

const removeEmployee = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    await Employee.deleteOne({ _id: id });
    return await findEmployee(req);
  } catch (error) {
    console.error(error);
  }
};

const createEmployee = async (req, res) => {
  try {
    // return req.body;
    const value = await validateEmployee(req, res);
    const id = uniqueId();
    const data = {
      ...value,
      _id: id,
      id
    };
    return await new Employee(data).save();
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  findEmployee,
  createEmployee,
  listOfEmployee,
  updateEmployee,
  removeEmployee,
};
