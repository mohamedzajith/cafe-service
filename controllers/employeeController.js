const { successResponse, errorResponse } = require("../utils/response");
const {
  findEmployee,
  createEmployee,
  listOfEmployee,
  updateEmployee,
  removeEmployee,
} = require("../services/employeeService");

const create = async (req, res) => {
  try {
    const EmployeeCreate = await createEmployee(req, res);
    successResponse(res, EmployeeCreate, "Employee created successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};

const index = async (req, res) => {
  try {
    const activities = await listOfEmployee(req, res);
    successResponse(res, activities, "Employee list");
  } catch (error) {
    errorResponse(res, error);
  }
};

const show = async (req, res) => {
  try {
    const Employee = await findEmployee(req, res);
    successResponse(res, Employee, "Employee details");
  } catch (error) {
    errorResponse(res, error);
  }
};

const update = async (req, res) => {
  try {
    const EmployeeUpdate = await updateEmployee(req, res);
    successResponse(res, EmployeeUpdate, "Employee updated successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const EmployeeRemove = await removeEmployee(req, res);
    successResponse(res, EmployeeRemove, "Employee remove successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  create,
  index,
  show,
  update,
  remove,
};
