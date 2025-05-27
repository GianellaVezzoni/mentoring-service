import { DependencyManager } from "../../../../dependencyManager";
import { getMetricActions } from "../../core/actions/actionProvider";
import { IMetricRepository } from "../../core/repository/IMetricRepository";
import { MetricControllers } from "./MetricControllers";

export const getMetricControllers = (dependencyManager: DependencyManager) => {
  const MetricRepository = getMetricRepository(dependencyManager);
  const MetricActions = getMetricActions(MetricRepository);
  return MetricControllers(MetricActions);
};

const getMetricRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("metricRepository") as IMetricRepository;
};
