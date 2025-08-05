import { transporter } from "./mailer.js";

export const sendResetEmail = async (toEmail, resetLink) => {
    const mailOptions = {
        from: `"YourApp Support" <${process.env.SENDER_EMAIL}>`,
        to: toEmail,
        subject: "Reset Your Password",
        html: `
      <h3>Password Reset Request</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};