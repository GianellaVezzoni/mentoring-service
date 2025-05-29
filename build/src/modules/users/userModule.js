"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModuleInitializer = void 0;
const MongoUserRepository_1 = require("./infrastructure/repository/MongoUserRepository");
const BcryptHashService_1 = require("./infrastructure/services/BcryptHashService");
const JwtTokenService_1 = require("./infrastructure/services/JwtTokenService");
const NodemailerEmailService_1 = require("./infrastructure/services/NodemailerEmailService");
const UserModuleInitializer = (dependencyManager) => {
    const userRepository = (0, MongoUserRepository_1.MongoUserRepository)();
    const hashService = (0, BcryptHashService_1.BcryptHashService)();
    const tokenService = (0, JwtTokenService_1.JwtTokenService)();
    const emailService = (0, NodemailerEmailService_1.NodemailerEmailService)();
    dependencyManager.register("userRepository", userRepository);
    dependencyManager.register("hashService", hashService);
    dependencyManager.register("tokenService", tokenService);
    dependencyManager.register("emailService", emailService);
};
exports.UserModuleInitializer = UserModuleInitializer;
