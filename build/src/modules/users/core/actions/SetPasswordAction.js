"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetPasswordAction = void 0;
const UserNotExistException_1 = require("../exceptions/UserNotExistException");
const SetPasswordAction = (userRepository, tokenService, hashService) => {
    return {
        execute: (token, newPassword) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tokenValidation = await tokenService.validatePasswordResetToken(token);
                    if (!tokenValidation.isValid) {
                        throw new Error("Invalid or expired token");
                    }
                    const user = await userRepository.getOneByEmail(tokenValidation.email);
                    if (!user) {
                        throw new UserNotExistException_1.UserNotExistException();
                    }
                    const hashedPassword = hashService.hash(newPassword);
                    await userRepository.updatePassword(tokenValidation.email, hashedPassword);
                    await tokenService.invalidateToken(token);
                    resolve({ message: "Password updated successfully" });
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.SetPasswordAction = SetPasswordAction;
