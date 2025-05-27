import { DependencyManager } from "../dependencyManager";
import { UserModuleInitializer } from "./users/userModule";
import { MongoMetricModuleInitialize } from "./metrics/metricModule";
import { ProgressModuleInitializer } from "./progress/progressModule";
import { ReportModuleInitialize } from "./reports/reportModule";
const ModulesInitializer = (dependencyManager: DependencyManager) => {
  UserModuleInitializer(dependencyManager);
  MongoMetricModuleInitialize(dependencyManager);
  ProgressModuleInitializer(dependencyManager);
  ReportModuleInitialize(dependencyManager);
};
export default ModulesInitializer;
