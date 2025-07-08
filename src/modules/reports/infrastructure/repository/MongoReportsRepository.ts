import configs from "../../../../configs";
import { IReportRepository } from "../../core/repository/IReportRepository";
import ReportModel from "../models/ReportModel";

export const MongoReportsRepository = (): IReportRepository => ({
  async save(report) {
    const newReport = new ReportModel(report);
    return await newReport.save();
  },
  async edit(report, id) {
    return await ReportModel.findByIdAndUpdate(id, report);
  },
  async remove(id) {
    return await ReportModel.findByIdAndDelete(id);
  },
  async get(query) {
    return await ReportModel.find(query);
  },
  async getById(id) {
    return await ReportModel.findById(id);
  },
  async getByUser(userId) {
    return await ReportModel.find({ userId });
  },
});
