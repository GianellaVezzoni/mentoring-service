import { Schema, model } from "mongoose";
const MetricSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  range: {
    type: Object,
    default: {
      min: 0,
      max: 100,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
MetricSchema.methods.toJSON = function () {
  const { __v, _id, password, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

export = model("Metric", MetricSchema);
