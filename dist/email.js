import * as nodemailer from 'nodemailer';
export async function email(service, sender_mail, sender_app_password, receiver_mail) {
    const transporter = nodemailer.createTransport({
        service,
        auth: {
            user: sender_mail,
            pass: sender_app_password
        }
    });
    const mailOptions = {
        from: sender_mail,
        to: receiver_mail,
        subject: 'Immediate Action Required: Session Compromise Detected',
        text: `Hello,

Shield detected unauthorized access to your account through a compromised session.

The affected session has been terminated to prevent further access.

REQUIRED ACTIONS:
- Log out from all devices immediately
- Change your account password immediately
- Log in again from a trusted device
- Review recent account activity

Failure to act quickly may put your data at risk.

If you do not recognize this activity, your credentials may be compromised.

— Shield Incident Response Team
shieldcorporationsltd@gmail.com`
    };
    await transporter.sendMail(mailOptions);
}
