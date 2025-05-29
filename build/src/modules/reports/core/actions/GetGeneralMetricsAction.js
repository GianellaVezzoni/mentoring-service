"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGeneralMetricsAction = void 0;
const GetGeneralMetricsAction = (userRepository, metricsRepository) => {
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
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetGeneralMetricsAction = GetGeneralMetricsAction;
