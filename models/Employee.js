const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { employeeDefinition } = require("./definitions/employee");
const SchemaPlugin = require("./helpers/schemaPlugin");

const { Schema } = mongoose;

const employeeSchema = new Schema(employeeDefinition, {
  collection: "employee",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

employeeSchema.plugin(uniqueValidator);
employeeSchema.plugin(mongoosePaginate);
employeeSchema.plugin(SchemaPlugin);

employeeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    // delete ret.password;
  },
});

module.exports = mongoose.model("employee", employeeSchema);
