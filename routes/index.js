const indexRoutes = (app) => {
  require("./employeeRoutes")(app);
  require("./cafeRoutes")(app);
};

module.exports = indexRoutes;
