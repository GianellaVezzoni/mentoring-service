"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetricControllers = void 0;
const actionProvider_1 = require("../../core/actions/actionProvider");
const MetricControllers_1 = require("./MetricControllers");
const getMetricControllers = (dependencyManager) => {
    const MetricRepository = getMetricRepository(dependencyManager);
    const MetricActions = (0, actionProvider_1.getMetricActions)(MetricRepository);
    return (0, MetricControllers_1.MetricControllers)(MetricActions);
};
exports.getMetricControllers = getMetricControllers;
const getMetricRepository = (dependencyManager) => {
    return dependencyManager.resolve("metricRepository");
};
