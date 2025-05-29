"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserAction = void 0;
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const EditUserAction = (UserRepository, hashService) => {
    return {
        execute(body, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { password } = body;
                    if (password) {
                        body.password = hashService.hash(password);
                    }
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    await UserRepository.edit(body, id);
                    const result = await UserRepository.getById(id);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.EditUserAction = EditUserAction;
