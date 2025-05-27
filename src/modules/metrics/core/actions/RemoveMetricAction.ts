import { isObjectIdOrHexString } from "mongoose";
import { InvalidIdException } from "../exceptions/InvalidIdException";
import { IMetricRepository } from "../repository/IMetricRepository";
import { MetricNotExistException } from "../exceptions/MetricNotExistException";

export interface IRemoveMetricAction {
  execute: (id: string) => Promise<any>;
}

export const RemoveMetricAction = (
  MetricRepository: IMetricRepository
): IRemoveMetricAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          const metric = await MetricRepository.getById(id);
          if (!metric) throw new MetricNotExistException();
          await MetricRepository.remove(id);
          resolve(metric);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
