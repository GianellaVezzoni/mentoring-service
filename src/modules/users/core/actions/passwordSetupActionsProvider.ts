import { IUserRepository } from "../repository/IMongoUserRepository";
import { IHashService } from "../services/IHashService";
import { ITokenService } from "../services/ITokenService";
import { IEmailService } from "../services/IEmailService";
import {
  GeneratePasswordResetLinkAction,
  IGeneratePasswordResetLinkAction,
} from "./GeneratePasswordResetLinkAction";
import {
  ValidatePasswordResetTokenAction,
  IValidatePasswordResetTokenAction,
} from "./ValidatePasswordResetTokenAction";
import { SetPasswordAction, ISetPasswordAction } from "./SetPasswordAction";

export interface IPasswordSetupActions {
  generateLink: IGeneratePasswordResetLinkAction;
  validateToken: IValidatePasswordResetTokenAction;
  setPassword: ISetPasswordAction;
}

export const getPasswordSetupActions = (
  userRepository: IUserRepository,
  hashService: IHashService,
  tokenService: ITokenService,
  emailService: IEmailService
): IPasswordSetupActions => {
  return {
    generateLink: GeneratePasswordResetLinkAction(
      userRepository,
      tokenService,
      emailService
    ),
    validateToken: ValidatePasswordResetTokenAction(tokenService),
    setPassword: SetPasswordAction(userRepository, tokenService, hashService),
  };
};
