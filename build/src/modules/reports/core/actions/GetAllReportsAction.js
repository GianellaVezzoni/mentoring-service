"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllReportsAction = void 0;
const GetAllReportsAction = (ReportRepository) => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const reports = await ReportRepository.get(query);
                    resolve(reports);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetAllReportsAction = GetAllReportsAction;
