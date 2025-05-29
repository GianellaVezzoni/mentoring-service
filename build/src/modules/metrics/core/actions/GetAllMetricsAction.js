"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMetricsAction = void 0;
const GetAllMetricsAction = (MetricRepository) => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const metrics = await MetricRepository.get(query);
                    resolve(metrics);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetAllMetricsAction = GetAllMetricsAction;
