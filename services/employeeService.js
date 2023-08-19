const {
  validateEmployee,
  validateEmployeeUpdate,
} = require("../schema-validation/employeeSchema");
const { Employee } = require("../models/index");
const { generateQuery } = require("../utils/queryBuilder");
const { employeeDefinition } = require("../models/definitions/employee");
const { uniqueId } = require("../utils/helper");
const { updateCafeEmployee } = require("./cafeService");
const { isEmpty, map, flatten, filter } = require("lodash");
const moment = require("moment");

const listOfEmployee = async (req, res) => {
  try {
    const {
      query: { name, cafe, ...restQuery },
      ...rest
    } = req;
    const cafeName = name || cafe ? { name: name || cafe } : {};
    const modifiedReq = { ...rest, query: { ...restQuery, ...cafeName } };
    const query = generateQuery(modifiedReq, employeeDefinition);
    const filterCafe = query.name ? {cafe: query.name } : {}

    const cafes = await Employee.aggregate([
      {
        $lookup: {
          from: "cafe", // The name of the target collection
          localField: "id", // Field in the User collection
          foreignField: "employee.id", // Field in the Post collection
          as: "cafe", // The field to store the joined posts
        },
      },
      {
        $project: {
          id: 1,
          _id: 0,
          name: 1,
          email_address: 1,
          phone_number: 1,
          gender: 1,
          cafe: {
            $ifNull: ["$cafe.name", []]
          },
          cafe_employee: {
            $ifNull: [
              "$cafe.employee",
              []
            ]
          },
        },
      },
      {
        $sort: {
          "employee.start_date": 1,
        },
      },
      {
        $match: filterCafe,
      },
    ]);

    return map(cafes, (data) => {
      const employee = isEmpty(data.cafe_employee) ? null : filter(flatten(data.cafe_employee[0]), {id: data.id,})[0]
      return {
        id: data.id,
        name: data.name,
        email_address: data.email_address,
        phone_number: data.phone_number,
        days_worked: employee ? moment().diff(moment(employee.start_date), 'days') : 0,
        cafe: isEmpty(data.cafe)? "": data.cafe[0],
      };
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
      params: { id },
    } = req;
    const employee = await findEmployee(req);
    if (!isEmpty(employee)) {
      const value = await validateEmployeeUpdate(req, res);
      await Employee.findByIdAndUpdate(id, value);
      const updatedEmployee = await findEmployee(req);
      if (value?.cafe_id) {
        const newReq = {
          ...req,
          body: {
            id: req?.body?.cafe_id,
            employee: { id: employee.id, start_date: req?.body?.start_date },
          },
        };
        const cafe = await updateCafeEmployee(newReq, res);
        return { cafe, employee: updatedEmployee };
      }
      return { employee: updatedEmployee };
    } else {
      return await findEmployee(req);
    }
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
    const value = await validateEmployee(req, res);
    const id = uniqueId();
    const data = {
      ...value,
      _id: id,
      id,
    };
    const employee = await new Employee(data).save();
    if (req?.body?.cafe_id) {
      const newReq = {
        ...req,
        body: {
          id: req?.body?.cafe_id,
          employee: { id: employee.id, start_date: req?.body?.start_date },
        },
      };
      const cafe = await updateCafeEmployee(newReq, res);
      return { cafe, employee };
    }
    return employee;
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
