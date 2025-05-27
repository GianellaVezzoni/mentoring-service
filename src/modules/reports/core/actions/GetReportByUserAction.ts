import { IReportRepository } from "../repository/IReportRepository";

export interface IGetReportByUserAction {
  execute: (userId: string) => Promise<any>;
}

export const GetReportByUserAction = (
  reportRepository: IReportRepository
): IGetReportByUserAction => {
  return {
    execute: async (userId: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          const report = await reportRepository.getByUser(userId);
          resolve(report);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
