"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUserAction = void 0;
const SaveUserAction = (UserRepository, hashService) => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = {
                        ...body,
                    };
                    if (body.role !== "USER_ROLE") {
                        user.password = hashService.hash(body?.password || "");
                    }
                    const result = await UserRepository.save(user);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.SaveUserAction = SaveUserAction;
