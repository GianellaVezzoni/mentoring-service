import { isObjectIdOrHexString } from "mongoose";
import { IReportRepository } from "../repository/IReportRepository";
import { ReportNotExistException } from "../exceptions/ReportNotExistException";
import { InvalidIdException } from "../exceptions/InvalidIdException";

export interface IRemoveReportAction {
  execute: (id: string) => Promise<any>;
}

export const RemoveReportAction = (
  ReportRepository: IReportRepository
): IRemoveReportAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          const report = await ReportRepository.getById(id);
          if (!report) throw new ReportNotExistException();
          await ReportRepository.remove(id);
          resolve(report);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
