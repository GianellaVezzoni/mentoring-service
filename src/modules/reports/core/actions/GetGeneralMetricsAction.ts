import { IReportRepository } from "../repository/IReportRepository";

import { IUserRepository } from "../../../users/core/repository/IMongoUserRepository";
import { IMetricRepository } from "../../../metrics/core/repository/IMetricRepository";

export interface IGetGeneralMetricsAction {
  execute: () => Promise<any>;
}

export const GetGeneralMetricsAction = (
  userRepository: IUserRepository,
  metricsRepository: IMetricRepository
): IGetGeneralMetricsAction => {
  return {
    execute: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const users = await userRepository.countRoles();
          const metrics = await metricsRepository.countMetrics();
          const generalMetrics = {
            users: {
              mentees: users.mentees,
              mentors: users.mentors,
            },
            metrics: metrics,
          };
          resolve(generalMetrics);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
