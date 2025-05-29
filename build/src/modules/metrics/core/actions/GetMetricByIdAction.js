"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMetricByIdAction = void 0;
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const MetricNotExistException_1 = require("../exceptions/MetricNotExistException");
const GetMetricByIdAction = (MetricRepository) => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    const metric = await MetricRepository.getById(id);
                    if (!metric)
                        throw new MetricNotExistException_1.MetricNotExistException();
                    resolve(metric);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetMetricByIdAction = GetMetricByIdAction;
