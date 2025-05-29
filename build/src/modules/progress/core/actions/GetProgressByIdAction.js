"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProgressByIdAction = void 0;
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const ProgressNotExistException_1 = require("../exceptions/ProgressNotExistException");
const GetProgressByIdAction = (ProgressRepository) => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    const progress = await ProgressRepository.getById(id);
                    if (!progress)
                        throw new ProgressNotExistException_1.ProgressNotExistException();
                    resolve(progress);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetProgressByIdAction = GetProgressByIdAction;
