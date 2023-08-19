const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/cafeController");

const cafeRoutes = (app) => {
  app.post("/api/v1/cafe", create);
  app.put("/api/v1/cafe/:id", update);
  app.delete("/api/v1/cafe/:id", remove);
  app.get("/api/v1/cafes", index);
  app.get("/api/v1/cafe/:id", show);
};

module.exports = cafeRoutes;
