"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveProgressAction = void 0;
const SaveProgressAction = (progressRepository) => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await progressRepository.save(body);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.SaveProgressAction = SaveProgressAction;
