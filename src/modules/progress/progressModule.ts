import { DependencyManager } from "../../dependencyManager";
import { MongoProgressRepository } from "./infrastructure/repository/MongoProgressRepository";
export const ProgressModuleInitializer = (
  dependencyManager: DependencyManager
) => {
  const progressRepository = MongoProgressRepository();
  dependencyManager.register("progressRepository", progressRepository);
};
