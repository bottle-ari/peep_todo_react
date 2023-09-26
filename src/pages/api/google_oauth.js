// google_oauth.js

import password from "../../../password";
const { google } = require("googleapis");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const oauth2Client = new google.auth.OAuth2(
    password.GOOGLE_OAUTH_CLIENT_ID,
    password.GOOGLE_OAUTH_CLIENT_SECRET,
    password.GOOGLE_OAUTH_REDIRECT_URL
  );

  const scopes = ["openid", "profile", "email"];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });

  res.status(200).json({ authorizationUrl });
}
