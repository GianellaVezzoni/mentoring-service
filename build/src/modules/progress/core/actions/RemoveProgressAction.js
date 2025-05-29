"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveProgressAction = void 0;
const mongoose_1 = require("mongoose");
const ProgressNotExistException_1 = require("../exceptions/ProgressNotExistException");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const RemoveProgressAction = (ProgressRepository) => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    const progress = await ProgressRepository.getById(id);
                    if (!progress)
                        throw new ProgressNotExistException_1.ProgressNotExistException();
                    await ProgressRepository.remove(id);
                    resolve(progress);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.RemoveProgressAction = RemoveProgressAction;
