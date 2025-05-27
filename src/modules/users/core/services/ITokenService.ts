export interface ITokenService {
  generatePasswordResetToken: (email: string) => Promise<string>;
  validatePasswordResetToken: (
    token: string
  ) => Promise<{ email: string; isValid: boolean }>;
  invalidateToken: (token: string) => Promise<void>;
}
