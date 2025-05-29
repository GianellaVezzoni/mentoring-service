"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgressControllers = void 0;
const actionsProvider_1 = require("../../core/actions/actionsProvider");
const ProgressControllers_1 = require("./ProgressControllers");
const getProgressControllers = (dependencyManager) => {
    const ProgressRepository = getProgressRepository(dependencyManager);
    const ProgressActions = (0, actionsProvider_1.getProgressActions)(ProgressRepository);
    return (0, ProgressControllers_1.ProgressControllers)(ProgressActions);
};
exports.getProgressControllers = getProgressControllers;
const getProgressRepository = (dependencyManager) => {
    return dependencyManager.resolve("progressRepository");
};
