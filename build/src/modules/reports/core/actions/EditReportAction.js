"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditReportAction = void 0;
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const EditReportAction = (ReportRepository) => {
    return {
        execute(body, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    await ReportRepository.edit(body, id);
                    const result = await ReportRepository.getById(id);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.EditReportAction = EditReportAction;
