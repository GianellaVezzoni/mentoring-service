"use strict";
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
});
UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
};
module.exports = (0, mongoose_1.model)("User", UserSchema);
