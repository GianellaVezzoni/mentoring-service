import { IUserRepository } from "../repository/IMongoUserRepository";
import { ITokenService } from "../services/ITokenService";
import { IHashService } from "../services/IHashService";
import { UserNotExistException } from "../exceptions/UserNotExistException";

export interface ISetPasswordAction {
  execute: (token: string, newPassword: string) => Promise<{ message: string }>;
}

export const SetPasswordAction = (
  userRepository: IUserRepository,
  tokenService: ITokenService,
  hashService: IHashService
): ISetPasswordAction => {
  return {
    execute: (token, newPassword) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Validate token
          const tokenValidation = await tokenService.validatePasswordResetToken(
            token
          );
          if (!tokenValidation.isValid) {
            throw new Error("Invalid or expired token");
          }

          // Get user
          const user = await userRepository.getOneByEmail(
            tokenValidation.email
          );
          if (!user) {
            throw new UserNotExistException();
          }

          // Hash new password
          const hashedPassword = hashService.hash(newPassword);

          // Update user password
          await userRepository.updatePassword(
            tokenValidation.email,
            hashedPassword
          );

          // Invalidate token
          await tokenService.invalidateToken(token);

          resolve({ message: "Password updated successfully" });
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
