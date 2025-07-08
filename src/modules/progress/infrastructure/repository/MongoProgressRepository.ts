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
    return await ProgressModel.find(query);
  },
  async getById(id) {
    return await ProgressModel.findById(id);
  },
  async getByUser(userId) {
    return await ProgressModel.find({ userId }).populate("metrics");
  },
});
