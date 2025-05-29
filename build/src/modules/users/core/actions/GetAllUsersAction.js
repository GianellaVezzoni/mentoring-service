"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersAction = void 0;
const GetAllUsersAction = (UserRepository) => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const users = await UserRepository.get(query);
                    resolve(users);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetAllUsersAction = GetAllUsersAction;
