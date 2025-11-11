// emailService.js
// Uses Gmail REST API (googleapis) to send emails via HTTPS (no SMTP).
// Required env vars:
//   EMAIL_USER
//   OAUTH_CLIENT_ID
//   OAUTH_CLIENT_SECRET
//   OAUTH_REFRESH_TOKEN

import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

// Create OAuth2 client
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground' // redirect URL used to obtain tokens (not used at runtime)
);

// Set refresh token from env
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

// Helper: base64url encode raw email
function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Helper: build raw RFC2822 email (simple HTML email)
function buildRawEmail({ from, to, subject, html }) {
  const lines = [];
  lines.push(`From: ${from}`);
  lines.push(`To: ${to}`);
  lines.push(`Subject: ${subject}`);
  lines.push('MIME-Version: 1.0');
  lines.push('Content-Type: text/html; charset=UTF-8');
  lines.push('');
  lines.push(html);
  const message = lines.join('\r\n');
  return base64UrlEncode(message);
}

// Core: send mail via Gmail API
async function sendMailViaGmailAPI({ to, subject, html }) {
  try {
    // Ensure access token can be obtained using refresh token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken =
      typeof accessTokenResponse === 'string'
        ? accessTokenResponse
        : accessTokenResponse?.token || accessTokenResponse?.access_token;

    if (!accessToken) {
      const info = typeof accessTokenResponse === 'object' ? accessTokenResponse : null;
      console.error('No access token obtained from getAccessToken(). Response:', info);
      throw new Error('Unable to obtain access token for Gmail API. Check OAUTH refresh token and scopes.');
    }

    // Use googleapis gmail client with the oauth2 client (it will handle attaching tokens)
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const raw = buildRawEmail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
      },
    });

    // Gmail returns an object with id, labelIds etc. Return it for debugging if needed.
    return res.data;
  } catch (err) {
    // Provide helpful logs (do not leak secrets)
    console.error('Gmail API send error:', err?.response?.data || err.message || err);
    throw err;
  }
}

// Exported functions used by your app
export const sendPasswordResetEmail = async (email, resetUrl) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px;">
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <hr />
      <p style="font-size:12px;color:#666;">If you didn't request this, you can ignore this email.</p>
    </div>
  `;

  try {
    const result = await sendMailViaGmailAPI({
      to: email,
      subject: 'Password Reset Request',
      html,
    });
    console.log('Password reset email sent (gmail api). id=', result?.id);
    return result;
  } catch (err) {
    console.error('Error sending password reset email:', err?.message || err);
    throw new Error('Failed to send password reset email');
  }
};

export const sendOtpEmail = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px;">
      <h2>Email Verification</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <div style="font-size:24px; font-weight:bold; background:#f4f4f4; padding:10px; border-radius:6px; text-align:center;">
        ${otp}
      </div>
      <p>This OTP is valid for 10 minutes.</p>
      <hr />
      <p style="font-size:12px;color:#666;">If you did not request this, please secure your account.</p>
    </div>
  `;

  try {
    const result = await sendMailViaGmailAPI({
      to: email,
      subject: 'Email Verification OTP',
      html,
    });
    console.log('OTP email sent (gmail api). id=', result?.id);
    return result;
  } catch (err) {
    console.error('Error sending OTP email:', err?.message || err);
    throw new Error('Failed to send OTP email');
  }
};
