"use strict";
const mongoose_1 = require("mongoose");
const MetricSchema = new mongoose_1.Schema({
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
module.exports = (0, mongoose_1.model)("Metric", MetricSchema);
