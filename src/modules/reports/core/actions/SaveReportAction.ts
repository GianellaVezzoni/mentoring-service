import { IReport } from "../entities/IReport";
import { IReportRepository } from "../repository/IReportRepository";

export interface ISaveReportAction {
  execute: (body: IReport) => Promise<any>;
}

export const SaveReportAction = (
  reportRepository: IReportRepository
): ISaveReportAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await reportRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
