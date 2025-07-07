import { Schema, model } from "mongoose";

const ProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    default: Date.now,
  },
  description: {
    type: String,
  },
  metrics: [
    {
      objective: { type: String, required: true },
      value: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  totalSessions: {
    type: Number,
    default: 0,
  },
});

ProgressSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

export = model("Progress", ProgressSchema);
