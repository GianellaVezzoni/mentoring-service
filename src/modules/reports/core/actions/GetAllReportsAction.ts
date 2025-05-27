import { IReportRepository } from "../repository/IReportRepository";

export interface IGetAllReportsAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllReportsAction = (
  ReportRepository: IReportRepository
): IGetAllReportsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const reports = await ReportRepository.get(query);
          resolve(reports);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
