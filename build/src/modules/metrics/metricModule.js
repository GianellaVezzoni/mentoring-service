"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoMetricModuleInitialize = void 0;
const MongoMetricsRepository_1 = require("./infrastructure/repository/MongoMetricsRepository");
const MongoMetricModuleInitialize = (dependencyManager) => {
    const metricRepository = (0, MongoMetricsRepository_1.MongoMetricsRepository)();
    dependencyManager.register("metricRepository", metricRepository);
};
exports.MongoMetricModuleInitialize = MongoMetricModuleInitialize;
