import configs from "../../../../configs";
import { IMetricRepository } from "../../core/repository/IMetricRepository";
import MetricModel from "../models/MetricModel";
export const MongoMetricsRepository = (): IMetricRepository => ({
  async save(metric) {
    const newMetric = new MetricModel(metric);
    return await newMetric.save();
  },
  async edit(metric, id) {
    return await MetricModel.findByIdAndUpdate(id, metric);
  },
  async remove(id) {
    return await MetricModel.findByIdAndDelete(id);
  },
  async get(query) {
    return await MetricModel.find(query);
  },
  async getById(id) {
    return await MetricModel.findById(id);
  },
  async countMetrics() {
    return await MetricModel.countDocuments();
  },
});
