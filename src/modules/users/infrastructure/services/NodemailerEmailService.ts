import { IEmailService } from "../../core/services/IEmailService";

export const NodemailerEmailService = (): IEmailService => ({
  async sendPasswordResetEmail(
    email: string,
    resetLink: string
  ): Promise<void> {
    try {
      // In a real implementation, you would configure nodemailer with your email provider
      // For now, we'll just log the email details

      // Mock email sending
      // const transporter = nodemailer.createTransporter({...});
      // await transporter.sendMail({
      //   from: process.env.FROM_EMAIL,
      //   to: email,
      //   subject: 'Password Reset Request',
      //   html: `<p>Click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`
      // });

      return Promise.resolve();
    } catch (error) {
      throw new Error(`Failed to send password reset email: ${error}`);
    }
  },
});
