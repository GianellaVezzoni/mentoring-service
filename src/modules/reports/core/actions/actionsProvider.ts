import { IReportRepository } from "../repository/IReportRepository";
import { ISaveReportAction, SaveReportAction } from "./SaveReportAction";
import { IEditReportAction } from "./EditReportAction";
import { IRemoveReportAction } from "./RemoveReportAction";
import { IGetAllReportsAction } from "./GetAllReportsAction";
import { IGetReportByIdAction } from "./GetReportByIdAction";
import { GetReportByIdAction } from "./GetReportByIdAction";
import { GetAllReportsAction } from "./GetAllReportsAction";
import { EditReportAction } from "./EditReportAction";
import { RemoveReportAction } from "./RemoveReportAction";
import {
  IGetReportByUserAction,
  GetReportByUserAction,
} from "./GetReportByUserAction";
import { IUserRepository } from "../../../users/core/repository/IMongoUserRepository";
import {
  GetGeneralMetricsAction,
  IGetGeneralMetricsAction,
} from "./GetGeneralMetricsAction";
import { IMetricRepository } from "../../../metrics/core/repository/IMetricRepository";
import { ICsvFileGenerationService } from "../../../../services/generateCsvFile/core/ICsvFileGenerationService";
import {
  GetCsvFileDataAction,
  IGetCsvFileDataAction,
} from "./GetCsvFileDataAction";

export interface IReportActions {
  save: ISaveReportAction;
  edit: IEditReportAction;
  remove: IRemoveReportAction;
  getAll: IGetAllReportsAction;
  getById: IGetReportByIdAction;
  getByUser: IGetReportByUserAction;
  getGeneralMetrics: IGetGeneralMetricsAction;
  getCsvFileData: IGetCsvFileDataAction;
}

export const getReportActions = (
  reportRepository: IReportRepository,
  userRepository: IUserRepository,
  metricsRepository: IMetricRepository,
  csvFileGenerationService: ICsvFileGenerationService
) => {
  const ReportActions: IReportActions = {
    save: SaveReportAction(reportRepository),
    edit: EditReportAction(reportRepository),
    remove: RemoveReportAction(reportRepository),
    getAll: GetAllReportsAction(reportRepository),
    getById: GetReportByIdAction(reportRepository),
    getByUser: GetReportByUserAction(reportRepository),
    getGeneralMetrics: GetGeneralMetricsAction(
      userRepository,
      metricsRepository
    ),
    getCsvFileData: GetCsvFileDataAction(
      userRepository,
      csvFileGenerationService
    ),
  };
  return ReportActions;
};
