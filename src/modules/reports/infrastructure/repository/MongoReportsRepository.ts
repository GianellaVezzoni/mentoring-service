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
    const {
      page_count = configs.api.default_page_count,
      page_number = 0,
      ...rest
    } = query;
    const total = await ReportModel.countDocuments(rest);
    const reports = await ReportModel.find(rest)
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
    return await ReportModel.findById(id);
  },
  async getByUser(userId) {
    return await ReportModel.find({ userId });
  },
});
