"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModule_1 = require("./users/userModule");
const metricModule_1 = require("./metrics/metricModule");
const progressModule_1 = require("./progress/progressModule");
const reportModule_1 = require("./reports/reportModule");
const ModulesInitializer = (dependencyManager) => {
    (0, userModule_1.UserModuleInitializer)(dependencyManager);
    (0, metricModule_1.MongoMetricModuleInitialize)(dependencyManager);
    (0, progressModule_1.ProgressModuleInitializer)(dependencyManager);
    (0, reportModule_1.ReportModuleInitialize)(dependencyManager);
};
exports.default = ModulesInitializer;
