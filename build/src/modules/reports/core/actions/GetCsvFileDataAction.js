"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCsvFileDataAction = void 0;
const GetCsvFileDataAction = (userRepository, csvFileGenerationService) => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let users;
                    if (body.type === "null") {
                        users = await userRepository.getDataWithProgress();
                    }
                    else {
                        users = await userRepository.getDataWithProgress(body.type);
                    }
                    const csvFile = await csvFileGenerationService.generateCsvFile(users);
                    resolve(csvFile);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GetCsvFileDataAction = GetCsvFileDataAction;
