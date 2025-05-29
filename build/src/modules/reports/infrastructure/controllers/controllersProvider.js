"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportControllers = void 0;
const actionsProvider_1 = require("../../core/actions/actionsProvider");
const ReportControllers_1 = require("./ReportControllers");
const getReportControllers = (dependencyManager) => {
    const ReportRepository = getReportRepository(dependencyManager);
    const UserRepository = getUserRepository(dependencyManager);
    const MetricsRepository = getMetricsRepository(dependencyManager);
    const CsvFileGenerationService = getCsvFileGenerationService(dependencyManager);
    const ReportActions = (0, actionsProvider_1.getReportActions)(ReportRepository, UserRepository, MetricsRepository, CsvFileGenerationService);
    return (0, ReportControllers_1.ReportControllers)(ReportActions);
};
exports.getReportControllers = getReportControllers;
const getReportRepository = (dependencyManager) => {
    return dependencyManager.resolve("reportRepository");
};
const getUserRepository = (dependencyManager) => {
    return dependencyManager.resolve("userRepository");
};
const getMetricsRepository = (dependencyManager) => {
    return dependencyManager.resolve("metricRepository");
};
const getCsvFileGenerationService = (dependencyManager) => {
    return dependencyManager.resolve("csvFileGenerationService");
};
