// emailService.js
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground' // redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

async function createTransporter() {
  try {
    // Get a fresh access token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken =
      accessTokenResponse?.token || accessTokenResponse?.access_token || accessTokenResponse;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Gmail SMTP
      port: 465, // Use 465 for SSL
      secure: true, // true for port 465, false for 587
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken,
      },
      tls: {
        // Allow self-signed certs and older TLS (needed in serverless)
        rejectUnauthorized: false,
        minVersion: 'TLSv1',
      },
      connectionTimeout: 15000, // 15 seconds
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    // Verify the connection works
    await transporter.verify();
    console.log('SMTP connection successful');
    return transporter;
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw new Error('Failed to create email transporter');
  }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"RoamMate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px;">
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}" style="color:#1a73e8;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const sendOtpEmail = async (email, otp) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `"RoamMate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px;">
        <h2>Email Verification</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <div style="font-size:24px; font-weight:bold; background:#f4f4f4; padding:10px; border-radius:6px; text-align:center;">
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};
