"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetricActions = void 0;
const EditMetricAction_1 = require("./EditMetricAction");
const GetAllMetricsAction_1 = require("./GetAllMetricsAction");
const GetMetricByIdAction_1 = require("./GetMetricByIdAction");
const RemoveMetricAction_1 = require("./RemoveMetricAction");
const SaveMetricAction_1 = require("./SaveMetricAction");
const getMetricActions = (metricRepository) => {
    const MetricActions = {
        save: (0, SaveMetricAction_1.SaveMetricAction)(metricRepository),
        edit: (0, EditMetricAction_1.EditMetricAction)(metricRepository),
        remove: (0, RemoveMetricAction_1.RemoveMetricAction)(metricRepository),
        getAll: (0, GetAllMetricsAction_1.GetAllMetricsAction)(metricRepository),
        getById: (0, GetMetricByIdAction_1.GetMetricByIdAction)(metricRepository),
    };
    return MetricActions;
};
exports.getMetricActions = getMetricActions;
