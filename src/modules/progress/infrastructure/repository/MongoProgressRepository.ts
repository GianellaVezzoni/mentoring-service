import ProgressModel from "../models/ProgressModel";
import { IProgressRepository } from "../../core/repository/IMongoProgressRepository";
import configs from "../../../../configs";

export const MongoProgressRepository = (): IProgressRepository => ({
  async save(progress) {
    const newProgress = new ProgressModel(progress);
    return await newProgress.save();
  },
  async edit(progress, id) {
    return await ProgressModel.findByIdAndUpdate(id, progress);
  },
  async remove(id) {
    return await ProgressModel.findByIdAndDelete(id);
  },
  async get(query) {
    const {
      page_count = configs.api.default_page_count,
      page_number = 0,
      ...rest
    } = query;
    const total = await ProgressModel.countDocuments(rest);
    const progress = await ProgressModel.find(rest)
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
    return await ProgressModel.findById(id);
  },
  async getByUser(userId) {
    return await ProgressModel.find({ userId });
  },
});
