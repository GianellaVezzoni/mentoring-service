"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetJwtValidator_1 = __importDefault(require("./infrastructure/GetJwtValidator"));
const JwtMiddlewareInitializer = (dependencyManager) => {
    const jwtValidator = (0, GetJwtValidator_1.default)(getUserRepository(dependencyManager));
    dependencyManager.register('jwtValidator', jwtValidator);
};
const getUserRepository = (dependencyManager) => {
    return dependencyManager.resolve('userRepository');
};
exports.default = JwtMiddlewareInitializer;
