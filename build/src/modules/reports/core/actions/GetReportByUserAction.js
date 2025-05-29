"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReportByUserAction = void 0;
const GetReportByUserAction = (reportRepository) => {
    return {
        execute: async (userId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const report = await reportRepository.getByUser(userId);
                    resolve(report);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetReportByUserAction = GetReportByUserAction;
