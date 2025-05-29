"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordSetupActions = void 0;
const GeneratePasswordResetLinkAction_1 = require("./GeneratePasswordResetLinkAction");
const ValidatePasswordResetTokenAction_1 = require("./ValidatePasswordResetTokenAction");
const SetPasswordAction_1 = require("./SetPasswordAction");
const getPasswordSetupActions = (userRepository, hashService, tokenService, emailService) => {
    return {
        generateLink: (0, GeneratePasswordResetLinkAction_1.GeneratePasswordResetLinkAction)(userRepository, tokenService, emailService),
        validateToken: (0, ValidatePasswordResetTokenAction_1.ValidatePasswordResetTokenAction)(tokenService),
        setPassword: (0, SetPasswordAction_1.SetPasswordAction)(userRepository, tokenService, hashService),
    };
};
exports.getPasswordSetupActions = getPasswordSetupActions;
