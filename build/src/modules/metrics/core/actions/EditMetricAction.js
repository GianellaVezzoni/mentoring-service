"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMetricAction = void 0;
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const EditMetricAction = (MetricRepository) => {
    return {
        execute(body, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    await MetricRepository.edit(body, id);
                    const result = await MetricRepository.getById(id);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.EditMetricAction = EditMetricAction;
