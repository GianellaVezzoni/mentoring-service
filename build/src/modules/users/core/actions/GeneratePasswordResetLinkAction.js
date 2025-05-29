"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePasswordResetLinkAction = void 0;
const UserNotExistException_1 = require("../exceptions/UserNotExistException");
const GeneratePasswordResetLinkAction = (userRepository, tokenService, emailService) => {
    return {
        execute: (email) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = await userRepository.getOneByEmail(email);
                    if (!user) {
                        throw new UserNotExistException_1.UserNotExistException();
                    }
                    const token = await tokenService.generatePasswordResetToken(email);
                    const resetLink = `${process.env.FRONTEND_URL}/password-reset?token=${token}`;
                    resolve({
                        message: "Password reset link sent to email",
                        token,
                        resetLink,
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
};
exports.GeneratePasswordResetLinkAction = GeneratePasswordResetLinkAction;
