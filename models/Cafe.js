const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { cafeDefinition } = require("./definitions/cafe");
const SchemaPlugin = require("./helpers/schemaPlugin");

const { Schema } = mongoose;

const cafeSchema = new Schema(cafeDefinition, {
  collection: "cafe",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

cafeSchema.plugin(uniqueValidator);
cafeSchema.plugin(mongoosePaginate);
cafeSchema.plugin(SchemaPlugin);

cafeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    console.log(ret);
    delete ret._id;
    // delete ret.password;
  },
});

module.exports = mongoose.model("cafe", cafeSchema);
