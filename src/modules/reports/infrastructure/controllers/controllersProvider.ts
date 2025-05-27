import { DependencyManager } from "../../../../dependencyManager";
import { IUserRepository } from "../../../users/core/repository/IMongoUserRepository";
import { IMetricRepository } from "../../../metrics/core/repository/IMetricRepository";
import { getReportActions } from "../../core/actions/actionsProvider";
import { IReportRepository } from "../../core/repository/IReportRepository";
import { ReportControllers } from "./ReportControllers";
import { ICsvFileGenerationService } from "../../../../services/generateCsvFile/core/ICsvFileGenerationService";

export const getReportControllers = (dependencyManager: DependencyManager) => {
  const ReportRepository = getReportRepository(dependencyManager);
  const UserRepository = getUserRepository(dependencyManager);
  const MetricsRepository = getMetricsRepository(dependencyManager);
  const CsvFileGenerationService =
    getCsvFileGenerationService(dependencyManager);
  const ReportActions = getReportActions(
    ReportRepository,
    UserRepository,
    MetricsRepository,
    CsvFileGenerationService
  );
  return ReportControllers(ReportActions);
};

const getReportRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("reportRepository") as IReportRepository;
};

const getUserRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("userRepository") as IUserRepository;
};

const getMetricsRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("metricRepository") as IMetricRepository;
};

const getCsvFileGenerationService = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve(
    "csvFileGenerationService"
  ) as ICsvFileGenerationService;
};
