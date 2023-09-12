// // google_oauth.js
// import password from "../../../password";

// const { google } = require("googleapis");

// /**
//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
//  * from the client_secret.json file. To get these credentials for your application, visit
//  * https://console.cloud.google.com/apis/credentials.
//  */
// const oauth2Client = new google.auth.OAuth2(
//   password.GOOGLE_OAUTH_CLIENT_ID,
//   password.GOOGLE_OAUTH_CLIENT_SECRET,
//   password.GOOGLE_OAUTH_REDIRECT_URL
// );

// // Access scopes for read-only Drive activity.
// const scopes = ["openid", "profile", "email"];

// // Generate a url that asks permissions for the Drive activity scope
// const authorizationUrl = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: "offline",
//   /** Pass in the scopes array defined above.
//    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//   scope: scopes,
//   // Enable incremental authorization. Recommended as a best practice.
//   include_granted_scopes: true,
// });

// module.exports = { authorizationUrl };

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
