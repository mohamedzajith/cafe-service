const _ = require("lodash");
const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

const options = {
  page: "1",
  limit: "10",
  lean: true,
  customLabels: myCustomLabels,
};

const generateOptions = (res) => {
  const pick = _.pick(res.query, ["page", "limit"]);
  return _.assign(options, pick);
};

const createQueryLine = (value, key) => {
  return {
    [key]: { $regex: value },
  };
};

const generateQuery = (req, modelDef) => {
  const fillters = {};
  const keys = _.map(modelDef, (value, key) => key);
  const query = _.map(_.pick(req.query, keys), (value, key) => {
    const queryLine = createQueryLine(value, key);
    _.assignIn(fillters, queryLine);
  });
  return fillters;
};

module.exports = {
  generateQuery,
  generateOptions,
};
