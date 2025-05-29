"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoProgressRepository = void 0;
const ProgressModel_1 = __importDefault(require("../models/ProgressModel"));
const configs_1 = __importDefault(require("../../../../configs"));
const MongoProgressRepository = () => ({
    async save(progress) {
        const newProgress = new ProgressModel_1.default(progress);
        return await newProgress.save();
    },
    async edit(progress, id) {
        return await ProgressModel_1.default.findByIdAndUpdate(id, progress);
    },
    async remove(id) {
        return await ProgressModel_1.default.findByIdAndDelete(id);
    },
    async get(query) {
        const { page_count = configs_1.default.api.default_page_count, page_number = 0, ...rest } = query;
        const total = await ProgressModel_1.default.countDocuments(rest);
        const progress = await ProgressModel_1.default.find(rest)
            .limit(Number(page_count))
            .skip(Number(page_number));
        const pagination = {
            total,
            page_number,
            page_count,
            records: progress.length,
        };
        return {
            progress,
            pagination,
        };
    },
    async getById(id) {
        return await ProgressModel_1.default.findById(id);
    },
    async getByUser(userId) {
        return await ProgressModel_1.default.find({ userId });
    },
});
exports.MongoProgressRepository = MongoProgressRepository;
