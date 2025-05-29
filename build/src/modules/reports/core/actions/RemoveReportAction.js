"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveReportAction = void 0;
const mongoose_1 = require("mongoose");
const ReportNotExistException_1 = require("../exceptions/ReportNotExistException");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const RemoveReportAction = (ReportRepository) => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    const report = await ReportRepository.getById(id);
                    if (!report)
                        throw new ReportNotExistException_1.ReportNotExistException();
                    await ReportRepository.remove(id);
                    resolve(report);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.RemoveReportAction = RemoveReportAction;
