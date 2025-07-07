import { DependencyManager } from "../../../../dependencyManager";
import { getUserActions } from "../../core/actions/actionsProvider";
import { IUserRepository } from "../../core/repository/IMongoUserRepository";
import { IHashService } from "../../core/services/IHashService";
import { UserControllers } from "./UserControllers";
import { IProgressRepository } from "../../../progress/core/repository/IMongoProgressRepository";

export const getUserControllers = (dependencyManager: DependencyManager) => {
  const UserRepository = getUserRepository(dependencyManager);
  const hashService = getHashService(dependencyManager);
  const progressRepository = getProgressRepository(dependencyManager);
  const UserActions = getUserActions(
    UserRepository,
    hashService,
    progressRepository
  );
  return UserControllers(UserActions);
};

const getUserRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("userRepository") as IUserRepository;
};
const getHashService = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("hashService") as IHashService;
};

const getProgressRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("progressRepository") as IProgressRepository;
};
