import { isObjectIdOrHexString } from "mongoose";
import { IReportRepository } from "../repository/IReportRepository";
import { InvalidIdException } from "../exceptions/InvalidIdException";
import { ReportNotExistException } from "../exceptions/ReportNotExistException";
export interface IGetReportByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetReportByIdAction = (
  ReportRepository: IReportRepository
): IGetReportByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          const report = await ReportRepository.getById(id);
          if (!report) throw new ReportNotExistException();
          resolve(report);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
