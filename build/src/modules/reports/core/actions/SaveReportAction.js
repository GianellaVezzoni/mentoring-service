"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveReportAction = void 0;
const SaveReportAction = (reportRepository) => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await reportRepository.save(body);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.SaveReportAction = SaveReportAction;
