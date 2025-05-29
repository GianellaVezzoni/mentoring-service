"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvFileGenerationService = void 0;
const csvFileGenerationService_1 = require("./service/csvFileGenerationService");
const csvFileGenerationService = (dependencyManager) => {
    const csvFileGenerationService = (0, csvFileGenerationService_1.CsvFileGenerationService)();
    dependencyManager.register("csvFileGenerationService", csvFileGenerationService);
};
exports.csvFileGenerationService = csvFileGenerationService;
