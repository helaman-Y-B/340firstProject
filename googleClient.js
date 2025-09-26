import dotenv from 'dotenv';
import { google } from 'googleapis';

import { getDb } from './mongodb/connection.js';

dotenv.config();

// The scope for reading contacts.
const SCOPES = ['profile', 'email'];
const c_id = process.env.GOOGLE_CLIENT_ID
const c_secret = process.env.CLIENT_SECRET
const redirect_url = process.env.GOOGLE_OAUTH_REDIRECT_URL; // Path to OAuth 2.0

// Authenticate with Google and get an authorized client.
  const oauth2Client = new google.auth.OAuth2(
  c_id,
  c_secret,
  redirect_url
);

/*
  * Redirect the user to Google's OAuth 2.0 server to initiate the authentication and authorization process.
*/
async function getAuthenticatedClient(req, res) {
  try {
    const authUrl = await oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).send('Authentication failed');
  }
}

/*
  * Handle the OAuth 2.0 server response and create a user in the database if they don't already exist.
*/
async function googleCallback(req, res) {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user information.
    const oauth2 = google.oauth2({version: 'v2', auth: oauth2Client});
    const user = await oauth2.userinfo.get();
    const { email, given_name, family_name, locale } = user.data;
    console.log(`User signed in: ${given_name} ${family_name} (${email})`);

    // Check if the user already exists in the database.
    const db = await getDb();
    const existingUser = await db.collection('users').findOne({ email });

    if (!existingUser) {
      await db.collection('users').insertOne({ given_name, family_name, email, locale });
      console.log('User created:', given_name, family_name);
      res.send('User signed in and created.');
    } else {
      console.log('User already exists:', email);
    } 
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    res.status(500).send('Authentication failed');
  }
}

export { getAuthenticatedClient, googleCallback };