"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoMetricsRepository = void 0;
const configs_1 = __importDefault(require("../../../../configs"));
const MetricModel_1 = __importDefault(require("../models/MetricModel"));
const MongoMetricsRepository = () => ({
    async save(metric) {
        const newMetric = new MetricModel_1.default(metric);
        return await newMetric.save();
    },
    async edit(metric, id) {
        return await MetricModel_1.default.findByIdAndUpdate(id, metric);
    },
    async remove(id) {
        return await MetricModel_1.default.findByIdAndDelete(id);
    },
    async get(query) {
        const { page_count = configs_1.default.api.default_page_count, page_number = 0, ...rest } = query;
        const total = await MetricModel_1.default.countDocuments(rest);
        const metrics = await MetricModel_1.default.find(rest)
            .limit(Number(page_count))
            .skip(Number(page_number));
        const pagination = {
            total,
            page_number,
            page_count,
            records: metrics.length,
        };
        return {
            metrics,
            pagination,
        };
    },
    async getById(id) {
        return await MetricModel_1.default.findById(id);
    },
    async countMetrics() {
        return await MetricModel_1.default.countDocuments();
    },
});
exports.MongoMetricsRepository = MongoMetricsRepository;
