import { IUserRepository } from "../repository/IMongoUserRepository";
import { ITokenService } from "../services/ITokenService";
import { IEmailService } from "../services/IEmailService";
import { UserNotExistException } from "../exceptions/UserNotExistException";

export interface IGeneratePasswordResetLinkAction {
  execute: (email: string) => Promise<{
    message: string;
    token: string;
    resetLink: string;
  }>;
}

export const GeneratePasswordResetLinkAction = (
  userRepository: IUserRepository,
  tokenService: ITokenService,
  emailService: IEmailService
): IGeneratePasswordResetLinkAction => {
  return {
    execute: (email) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Check if user exists
          const user = await userRepository.getOneByEmail(email);
          if (!user) {
            throw new UserNotExistException();
          }

          // Generate token
          const token = await tokenService.generatePasswordResetToken(email);

          // Create reset link
          const resetLink = `${process.env.FRONTEND_URL}/password-reset?token=${token}`;

          // Send email
          //await emailService.sendPasswordResetEmail(email, resetLink);

          resolve({
            message: "Password reset link sent to email",
            token,
            resetLink,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
