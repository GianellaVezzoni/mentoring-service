"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUserAction = void 0;
const GetOneUserAction = (UserRepository) => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = await UserRepository.getOne(query);
                    resolve(user);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetOneUserAction = GetOneUserAction;
