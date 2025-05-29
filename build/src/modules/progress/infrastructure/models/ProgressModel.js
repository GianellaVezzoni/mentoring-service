"use strict";
const mongoose_1 = require("mongoose");
const ProgressSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    metrics: {
        type: Object,
        default: {},
    },
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
module.exports = (0, mongoose_1.model)("Progress", ProgressSchema);
