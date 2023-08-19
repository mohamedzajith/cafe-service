const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/employeeController");

const employeeRoutes = (app) => {
  app.post("/api/v1/employee", create);
  app.put("/api/v1/employee/:id", update);
  app.delete("/api/v1/employee/:id", remove);
  app.get("/api/v1/employees", index);
  app.get("/api/v1/employee/:id", show);
};

module.exports = employeeRoutes;
