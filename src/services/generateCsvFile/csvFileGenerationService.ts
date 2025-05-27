import { DependencyManager } from "../../dependencyManager";
import { ICsvFileGenerationService } from "./core/ICsvFileGenerationService";
import { CsvFileGenerationService } from "./service/csvFileGenerationService";

export const csvFileGenerationService = (
  dependencyManager: DependencyManager
) => {
  const csvFileGenerationService = CsvFileGenerationService();
  dependencyManager.register(
    "csvFileGenerationService",
    csvFileGenerationService
  );
};
