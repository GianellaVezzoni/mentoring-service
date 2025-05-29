"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProgressAction = void 0;
const GetAllProgressAction = (ProgressRepository) => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const progress = await ProgressRepository.get(query);
                    resolve(progress);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetAllProgressAction = GetAllProgressAction;
