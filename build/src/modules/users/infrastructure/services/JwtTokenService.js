"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtTokenService = () => ({
    async generatePasswordResetToken(email) {
        const secret = process.env.JWT_SECRET || "default-secret";
        const token = jsonwebtoken_1.default.sign({ email, type: "password-reset" }, secret, {
            expiresIn: "1h",
        });
        return token;
    },
    async validatePasswordResetToken(token) {
        try {
            const secret = process.env.JWT_SECRET || "default-secret";
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (decoded.type !== "password-reset") {
                return { email: "", isValid: false };
            }
            return { email: decoded.email, isValid: true };
        }
        catch (error) {
            return { email: "", isValid: false };
        }
    },
    async invalidateToken(token) {
        return Promise.resolve();
    },
});
exports.JwtTokenService = JwtTokenService;
