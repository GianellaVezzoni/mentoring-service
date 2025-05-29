"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoReportsRepository = void 0;
const configs_1 = __importDefault(require("../../../../configs"));
const ReportModel_1 = __importDefault(require("../models/ReportModel"));
const MongoReportsRepository = () => ({
    async save(report) {
        const newReport = new ReportModel_1.default(report);
        return await newReport.save();
    },
    async edit(report, id) {
        return await ReportModel_1.default.findByIdAndUpdate(id, report);
    },
    async remove(id) {
        return await ReportModel_1.default.findByIdAndDelete(id);
    },
    async get(query) {
        const { page_count = configs_1.default.api.default_page_count, page_number = 0, ...rest } = query;
        const total = await ReportModel_1.default.countDocuments(rest);
        const reports = await ReportModel_1.default.find(rest)
            .limit(Number(page_count))
            .skip(Number(page_number));
        const pagination = {
            total,
            page_number,
            page_count,
            records: reports.length,
        };
        return {
            reports,
            pagination,
        };
    },
    async getById(id) {
        return await ReportModel_1.default.findById(id);
    },
    async getByUser(userId) {
        return await ReportModel_1.default.find({ userId });
    },
});
exports.MongoReportsRepository = MongoReportsRepository;
