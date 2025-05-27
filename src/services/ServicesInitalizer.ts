import { DependencyManager } from "../dependencyManager";
import { CsvFileGenerationService } from "../services/generateCsvFile/service/csvFileGenerationService";
// We can register global services here

const ServicesInitializer = (dependencyManager: DependencyManager) => {
  const csvFileGenerationService = CsvFileGenerationService();
  dependencyManager.register(
    "csvFileGenerationService",
    csvFileGenerationService
  );
};
export default ServicesInitializer;
