"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUserAction = void 0;
const UserNotExistException_1 = require("../exceptions/UserNotExistException");
const mongoose_1 = require("mongoose");
const InvalidIdException_1 = require("../exceptions/InvalidIdException");
const RemoveUserAction = (UserRepository) => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!(0, mongoose_1.isObjectIdOrHexString)(id))
                        throw new InvalidIdException_1.InvalidIdException();
                    const user = await UserRepository.getById(id);
                    if (!user)
                        throw new UserNotExistException_1.UserNotExistException();
                    await UserRepository.remove(id);
                    resolve(user);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.RemoveUserAction = RemoveUserAction;
