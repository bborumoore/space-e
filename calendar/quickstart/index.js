const fs = require('fs');
const path = require('path');
require('dotenv').config();

const requiredFields = [
  'TYPE',
  'PROJECT_ID',
  'PRIVATE_KEY_ID',
  'PRIVATE_KEY',
  'CLIENT_EMAIL',
  'CLIENT_ID',
  'AUTH_URI',
  'TOKEN_URI',
  'AUTH_PROVIDER_X509_CERT_URL',
  'CLIENT_X509_CERT_URL'
];

const hasAllFields = requiredFields.every((field) => process.env[field]);

if (!hasAllFields) {
  console.warn('Skipping credentials.json generation because one or more required env vars are missing.');
  process.exit(0);
}

const credentials = JSON.stringify({
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
}, null, 2);

const targetPath = path.join(process.cwd(), 'calendar', 'quickstart', 'credentials.json');
fs.writeFileSync(targetPath, credentials);