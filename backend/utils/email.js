const Brevo = require('@getbrevo/brevo');
const { TransactionalEmailsApi, SendSmtpEmail } = Brevo;
require('dotenv').config();

// Initialize API client
const client = new TransactionalEmailsApi();

// Set API key
client.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

const sendVerificationEmail = async ({ toEmail, otp }) => {
  if (!toEmail || !otp) {
    throw new Error('Email and OTP are required');
  }

  // Build message
  const email = new SendSmtpEmail();
  email.subject = 'Your Email Verification OTP';
  email.htmlContent = `
    <html><body>
      <h2>Email Verification</h2>
      <p>Your OTP (One Time Password) is:</p>
      <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <p>Do not share this OTP with anyone.</p>
      <p>Thank you,<br/>Blogify Team</p>
      <p>for any issues, contact <a href="mailto:blogify-support@surajitsen.live">blogify-support@surajitsen.live</a></p>
    </body></html>
  `;
  email.sender = { email: process.env.EMAIL_FROM, name: 'Blogify Verification System' };
  email.to = [{ email: toEmail }];

  // Send
  return client.sendTransacEmail(email);
};

module.exports = { sendVerificationEmail };
