import { DependencyManager } from "../../../../dependencyManager";
import { IUserRepository } from "../../core/repository/IMongoUserRepository";
import { IHashService } from "../../core/services/IHashService";
import { ITokenService } from "../../core/services/ITokenService";
import { IEmailService } from "../../core/services/IEmailService";
import { getPasswordSetupActions } from "../../core/actions/passwordSetupActionsProvider";
import { PasswordSetupControllers } from "./PasswordSetupControllers";

export const getPasswordSetupControllers = (
  dependencyManager: DependencyManager
) => {
  const userRepository = dependencyManager.resolve(
    "userRepository"
  ) as IUserRepository;
  const hashService = dependencyManager.resolve("hashService") as IHashService;
  const tokenService = dependencyManager.resolve(
    "tokenService"
  ) as ITokenService;
  const emailService = dependencyManager.resolve(
    "emailService"
  ) as IEmailService;

  const passwordSetupActions = getPasswordSetupActions(
    userRepository,
    hashService,
    tokenService,
    emailService
  );

  return PasswordSetupControllers(passwordSetupActions);
};
