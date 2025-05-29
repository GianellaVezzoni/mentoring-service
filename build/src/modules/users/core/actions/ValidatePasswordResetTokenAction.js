"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePasswordResetTokenAction = void 0;
const ValidatePasswordResetTokenAction = (tokenService) => {
    return {
        execute: (token) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await tokenService.validatePasswordResetToken(token);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.ValidatePasswordResetTokenAction = ValidatePasswordResetTokenAction;
