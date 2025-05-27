import { ITokenService } from "../services/ITokenService";

export interface IValidatePasswordResetTokenAction {
  execute: (token: string) => Promise<{ isValid: boolean; email?: string }>;
}

export const ValidatePasswordResetTokenAction = (
  tokenService: ITokenService
): IValidatePasswordResetTokenAction => {
  return {
    execute: (token) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await tokenService.validatePasswordResetToken(token);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
