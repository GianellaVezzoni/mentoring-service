"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportActions = void 0;
const SaveReportAction_1 = require("./SaveReportAction");
const GetReportByIdAction_1 = require("./GetReportByIdAction");
const GetAllReportsAction_1 = require("./GetAllReportsAction");
const EditReportAction_1 = require("./EditReportAction");
const RemoveReportAction_1 = require("./RemoveReportAction");
const GetReportByUserAction_1 = require("./GetReportByUserAction");
const GetGeneralMetricsAction_1 = require("./GetGeneralMetricsAction");
const GetCsvFileDataAction_1 = require("./GetCsvFileDataAction");
const getReportActions = (reportRepository, userRepository, metricsRepository, csvFileGenerationService) => {
    const ReportActions = {
        save: (0, SaveReportAction_1.SaveReportAction)(reportRepository),
        edit: (0, EditReportAction_1.EditReportAction)(reportRepository),
        remove: (0, RemoveReportAction_1.RemoveReportAction)(reportRepository),
        getAll: (0, GetAllReportsAction_1.GetAllReportsAction)(reportRepository),
        getById: (0, GetReportByIdAction_1.GetReportByIdAction)(reportRepository),
        getByUser: (0, GetReportByUserAction_1.GetReportByUserAction)(reportRepository),
        getGeneralMetrics: (0, GetGeneralMetricsAction_1.GetGeneralMetricsAction)(userRepository, metricsRepository),
        getCsvFileData: (0, GetCsvFileDataAction_1.GetCsvFileDataAction)(userRepository, csvFileGenerationService),
    };
    return ReportActions;
};
exports.getReportActions = getReportActions;
