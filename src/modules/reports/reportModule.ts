import { DependencyManager } from "../../dependencyManager";
import { MongoReportsRepository } from "./infrastructure/repository/MongoReportsRepository";

export const ReportModuleInitialize = (
  dependencyManager: DependencyManager
) => {
  const reportRepository = MongoReportsRepository();
  dependencyManager.register("reportRepository", reportRepository);
};
