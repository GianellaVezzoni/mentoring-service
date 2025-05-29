"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerEmailService = void 0;
const NodemailerEmailService = () => ({
    async sendPasswordResetEmail(email, resetLink) {
        try {
            return Promise.resolve();
        }
        catch (error) {
            throw new Error(`Failed to send password reset email: ${error}`);
        }
    },
});
exports.NodemailerEmailService = NodemailerEmailService;
