module.exports = function (schema) {
  const updateTimestemps = function (next) {
    const self = this;

    if (!self.createdAt) {
      self.created_at = new Date();
      //or self.update({},{ $set: { createdDate : new Date(), updatedDate: new Date() } });
    } else {
      self.updated_at = new Date();
      //or self.update({},{ $set: {updatedDate: new Date() } });
    }
    next();
  };

  schema
    .pre("save", updateTimestemps)
    .pre("update", updateTimestemps)
    .pre("findOneAndUpdate", updateTimestemps);
};
