"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModuleInitialize = void 0;
const MongoReportsRepository_1 = require("./infrastructure/repository/MongoReportsRepository");
const ReportModuleInitialize = (dependencyManager) => {
    const reportRepository = (0, MongoReportsRepository_1.MongoReportsRepository)();
    dependencyManager.register("reportRepository", reportRepository);
};
exports.ReportModuleInitialize = ReportModuleInitialize;
