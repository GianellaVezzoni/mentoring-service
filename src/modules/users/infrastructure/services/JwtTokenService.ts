import jwt from "jsonwebtoken";
import { ITokenService } from "../../core/services/ITokenService";

export const JwtTokenService = (): ITokenService => ({
  async generatePasswordResetToken(email: string): Promise<string> {
    const secret = process.env.JWT_SECRET || "default-secret";
    const token = jwt.sign({ email, type: "password-reset" }, secret, {
      expiresIn: "1h",
    });
    return token;
  },

  async validatePasswordResetToken(
    token: string
  ): Promise<{ email: string; isValid: boolean }> {
    try {
      const secret = process.env.JWT_SECRET || "default-secret";
      const decoded = jwt.verify(token, secret) as any;

      if (decoded.type !== "password-reset") {
        return { email: "", isValid: false };
      }

      return { email: decoded.email, isValid: true };
    } catch (error) {
      return { email: "", isValid: false };
    }
  },

  async invalidateToken(token: string): Promise<void> {
    return Promise.resolve();
  },
});
