const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load client secrets from a local file.
const credentials = JSON.parse(fs.readFileSync('../../client_secret.json'));

// This object holds all the credentials, including the API key and access token.
const { client_secret, client_id, redirect_uris } = credentials.installed;

// Create an OAuth2 client with the given credentials
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Generate an authentication URL
const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
  });
  return authUrl;
};

// Exchange authorization code for access token
const getAccessToken = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
};

module.exports = {
  getAuthUrl,
  getAccessToken,
  oAuth2Client,
};
