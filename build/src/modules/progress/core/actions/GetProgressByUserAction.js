"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProgressByUserAction = void 0;
const GetProgressByUserAction = (progressRepository) => {
    return {
        execute: async (userId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const progress = await progressRepository.getByUser(userId);
                    resolve(progress);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetProgressByUserAction = GetProgressByUserAction;
