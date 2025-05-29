"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveMetricAction = void 0;
const SaveMetricAction = (metricRepository) => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await metricRepository.save(body);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.SaveMetricAction = SaveMetricAction;
