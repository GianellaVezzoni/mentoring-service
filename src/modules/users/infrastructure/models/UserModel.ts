import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER_ROLE", "ADMIN_ROLE", "SUPER_ADMIN_ROLE"],
    default: "USER_ROLE",
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
  mentorId: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  objectives: {
    type: [String],
    ref: "Metric",
    default: [],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

export = model("User", UserSchema);
