"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordSetupControllers = void 0;
const passwordSetupActionsProvider_1 = require("../../core/actions/passwordSetupActionsProvider");
const PasswordSetupControllers_1 = require("./PasswordSetupControllers");
const getPasswordSetupControllers = (dependencyManager) => {
    const userRepository = dependencyManager.resolve("userRepository");
    const hashService = dependencyManager.resolve("hashService");
    const tokenService = dependencyManager.resolve("tokenService");
    const emailService = dependencyManager.resolve("emailService");
    const passwordSetupActions = (0, passwordSetupActionsProvider_1.getPasswordSetupActions)(userRepository, hashService, tokenService, emailService);
    return (0, PasswordSetupControllers_1.PasswordSetupControllers)(passwordSetupActions);
};
exports.getPasswordSetupControllers = getPasswordSetupControllers;
