# Setup project
1. Use GCP credentials to create a service account and download the JSON key file to secrets.json file.
2. Update in .env SHEET_ID with the ID of the spreadsheet you want to use.
3. Update in .env provider with the name of the service account you created.
4. Deploy on GCP Cloud Run 
## Deployment on GCP
 - Enable: Google Sheets API
 - Enable: Google Cloud Storage API
 - Create OAuth client ID (API & Services)
   - Authorized redirect URIs: {DOMAIN}/api/auth/google/callback

## Permissions for GCP service account
- Editor — This allows the service account to enable or disable APIs or installing updates from the Google Cloud SDK.
- Cloud Run Admin — This allows the service account to run Cloud Run commands like pushing or deploying the application.
- Storage Admin — This allows the service account to push the Docker image to Google Container Registry.
- Service Account User — This allows the service account to deploy as a service account in Cloud Run.