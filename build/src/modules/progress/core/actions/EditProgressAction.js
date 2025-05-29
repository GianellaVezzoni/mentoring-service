"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProgressAction = void 0;
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const EditProgressAction = (ProgressRepository) => {
    return {
        execute(body, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    const result = await ProgressRepository.edit({ ...body, updatedAt: new Date() }, id);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.EditProgressAction = EditProgressAction;
