"use strict";
const mongoose_1 = require("mongoose");
const ReportSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        enum: ["WEEKLY", "MONTHLY", "QUARTERLY", "ANNUAL"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
        default: "DRAFT",
    },
    metrics: [
        {
            name: {
                type: String,
                required: true,
            },
            value: {
                type: Number,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});
ReportSchema.methods.toJSON = function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
};
module.exports = (0, mongoose_1.model)("Report", ReportSchema);
