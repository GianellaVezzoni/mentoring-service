"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserControllers = void 0;
const actionsProvider_1 = require("../../core/actions/actionsProvider");
const UserControllers_1 = require("./UserControllers");
const getUserControllers = (dependencyManager) => {
    const UserRepository = getUserRepository(dependencyManager);
    const hashService = getHashService(dependencyManager);
    const UserActions = (0, actionsProvider_1.getUserActions)(UserRepository, hashService);
    return (0, UserControllers_1.UserControllers)(UserActions);
};
exports.getUserControllers = getUserControllers;
const getUserRepository = (dependencyManager) => {
    return dependencyManager.resolve('userRepository');
};
const getHashService = (dependencyManager) => {
    return dependencyManager.resolve('hashService');
};
