import { DependencyManager } from "../../../../dependencyManager";
import { getProgressActions } from "../../core/actions/actionsProvider";
import { IProgressRepository } from "../../core/repository/IMongoProgressRepository";
import { ProgressControllers } from "./ProgressControllers";
export const getProgressControllers = (
  dependencyManager: DependencyManager
) => {
  const ProgressRepository = getProgressRepository(dependencyManager);
  const ProgressActions = getProgressActions(ProgressRepository);
  return ProgressControllers(ProgressActions);
};

const getProgressRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("progressRepository") as IProgressRepository;
};
