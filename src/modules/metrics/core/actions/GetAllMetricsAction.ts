import { IMetricRepository } from "../repository/IMetricRepository";

export interface IGetAllMetricsAction {
  execute: (query: any) => Promise<any>;
}
export const GetAllMetricsAction = (
  MetricRepository: IMetricRepository
): IGetAllMetricsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const metrics = await MetricRepository.get(query);
          resolve(metrics);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
