import { DependencyManager } from "../../dependencyManager";
import { MongoMetricsRepository } from "./infrastructure/repository/MongoMetricsRepository";

export const MongoMetricModuleInitialize = (
  dependencyManager: DependencyManager
) => {
  const metricRepository = MongoMetricsRepository();
  dependencyManager.register("metricRepository", metricRepository);
};
