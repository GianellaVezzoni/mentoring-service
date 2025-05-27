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
    const {
      page_count = configs.api.default_page_count,
      page_number = 0,
      ...rest
    } = query;
    const total = await MetricModel.countDocuments(rest);
    const metrics = await MetricModel.find(rest)
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
    return await MetricModel.findById(id);
  },
  async countMetrics() {
    return await MetricModel.countDocuments();
  },
});
