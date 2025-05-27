import { isObjectIdOrHexString } from "mongoose";
import { IReport } from "../entities/IReport";
import { IReportRepository } from "../repository/IReportRepository";
import { InvalidIdException } from "../exceptions/InvalidIdException";
export interface IEditReportAction {
  execute: (body: IReport, id: string) => Promise<any>;
}

export const EditReportAction = (
  ReportRepository: IReportRepository
): IEditReportAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          await ReportRepository.edit(body, id);
          const result = await ReportRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
