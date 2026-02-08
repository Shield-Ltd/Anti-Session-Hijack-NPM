import * as nodemailer from 'nodemailer';

export async function email(
    service: string,
    sender_mail: string,
    sender_app_password: string,
    receiver_mail: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: sender_mail,
      pass: sender_app_password
    }
  });

  const mailOptions = {
    from: sender_mail,
    to: receiver_mail,
    subject: "Security Alert: Session Hijacked",
    text: `
Hello,

We detected suspicious activity on your account.

Your session appears to have been hijacked.
To protect your account, please:

1. Log out immediately
2. Log in again
3. Change your password if needed

If this was not you, take action as soon as possible to secure your account.

Stay safe,
Security Team
    `
  };

  await transporter.sendMail(mailOptions);
}
