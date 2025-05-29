"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressModuleInitializer = void 0;
const MongoProgressRepository_1 = require("./infrastructure/repository/MongoProgressRepository");
const ProgressModuleInitializer = (dependencyManager) => {
    const progressRepository = (0, MongoProgressRepository_1.MongoProgressRepository)();
    dependencyManager.register("progressRepository", progressRepository);
};
exports.ProgressModuleInitializer = ProgressModuleInitializer;
