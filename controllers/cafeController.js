const { successResponse, errorResponse } = require("../utils/response");
const {
  findCafe,
  createCafe,
  listOfCafe,
  updateCafe,
  removeCafe,
} = require("../services/cafeService");

const create = async (req, res) => {
  try {
    const cafeCreate = await createCafe(req, res);
    successResponse(res, cafeCreate, "Cafe created successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};

const index = async (req, res) => {
  try {
    const cafes = await listOfCafe(req, res);
    successResponse(res, cafes, "Cafe list");
  } catch (error) {
    errorResponse(res, error);
  }
};

const show = async (req, res) => {
  try {
    const cafe = await findCafe(req, res);
    successResponse(res, cafe, "Cafe details");
  } catch (error) {
    errorResponse(res, error);
  }
};

const update = async (req, res) => {
  try {
    const cafeUpdate = await updateCafe(req, res);
    successResponse(res, cafeUpdate, "Cafe updated successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const cafeRemove = await removeCafe(req, res);
    successResponse(res, cafeRemove, "Cafe remove successfully");
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
