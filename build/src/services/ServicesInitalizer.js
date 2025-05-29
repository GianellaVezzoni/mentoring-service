"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvFileGenerationService_1 = require("../services/generateCsvFile/service/csvFileGenerationService");
const ServicesInitializer = (dependencyManager) => {
    const csvFileGenerationService = (0, csvFileGenerationService_1.CsvFileGenerationService)();
    dependencyManager.register("csvFileGenerationService", csvFileGenerationService);
};
exports.default = ServicesInitializer;
