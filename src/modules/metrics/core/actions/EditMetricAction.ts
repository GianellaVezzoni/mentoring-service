import { isObjectIdOrHexString } from "mongoose";
import { IMetric } from "../entities/IMetric";
import { IMetricRepository } from "../repository/IMetricRepository";
import { InvalidIdException } from "../exceptions/InvalidIdException";

export interface IEditMetricAction {
  execute: (body: IMetric, id: string) => Promise<any>;
}
export const EditMetricAction = (
  MetricRepository: IMetricRepository
): IEditMetricAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          await MetricRepository.edit(body, id);
          const result = await MetricRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
