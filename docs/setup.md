# Setup project
1. Use GCP credentials to create a service account and download the JSON key file to secrets.json file.
2. Update in .env SHEET_ID with the ID of the spreadsheet you want to use.
3. Update in .env provider with the name of the service account you created.

## Deployment on GCP
 - Enable: Google Sheets API
 - Enable: Google Cloud Storage API
 - Create OAuth client ID (API & Services)
   - Authorized redirect URIs: {DOMAIN}/api/auth/google/callback
