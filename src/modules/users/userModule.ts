import { DependencyManager } from "../../dependencyManager";
import { MongoUserRepository } from "./infrastructure/repository/MongoUserRepository";
import { BcryptHashService } from "./infrastructure/services/BcryptHashService";
import { JwtTokenService } from "./infrastructure/services/JwtTokenService";
import { NodemailerEmailService } from "./infrastructure/services/NodemailerEmailService";

export const UserModuleInitializer = (dependencyManager: DependencyManager) => {
  const userRepository = MongoUserRepository();
  const hashService = BcryptHashService();
  const tokenService = JwtTokenService();
  const emailService = NodemailerEmailService();

  dependencyManager.register("userRepository", userRepository);
  dependencyManager.register("hashService", hashService);
  dependencyManager.register("tokenService", tokenService);
  dependencyManager.register("emailService", emailService);
};
