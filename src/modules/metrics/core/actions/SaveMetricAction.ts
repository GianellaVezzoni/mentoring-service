import { IMetric } from "../entities/IMetric";
import { IMetricRepository } from "../repository/IMetricRepository";

export interface ISaveMetricAction {
  execute: (body: IMetric) => Promise<any>;
}

export const SaveMetricAction = (
  metricRepository: IMetricRepository
): ISaveMetricAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await metricRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
