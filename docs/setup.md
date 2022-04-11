# Setup project locally

1. Create or use existing Google Cloud Platform(GCP) project
2. [Create service account on GCP](https://console.cloud.google.com/iam-admin/serviceaccounts/new) with roles from the list below and download JSON key file as `sercet.json` to the root folder on your local machine.
List of required roles:
- **Cloud Run Admin** - This allows the service account to run Cloud Run commands like pushing or deploying the application.
- **Editor** - This allows the service account to enable or disable APIs or installing updates from the Google Cloud SDK.
- **Service Account User** - This allows the service account to deploy as a service account in Cloud Run.
- **Storage Admin** - This allows the service account to push the Docker image to Google Container Registry
3. Enable OAuth 2.0 for your project by follow https://next-auth.js.org/providers/google to get the client ID and client secret. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET values in .env file

4. (Enable Google Sheets API)[https://console.cloud.google.com/marketplace/product/google/sheets.googleapis.com?q=search&referrer=search].
Clone [the sheet document](https://docs.google.com/spreadsheets/d/1S_wS5vYW5yr49WDVbfmq3g-4AALU6p0I0UXP1UoNvq4)
 by click on menu File/Make a copy.
 Shared the sheet with a GCP service account email address.
 Use [spread sheet id](https://developers.google.com/sheets/api/guides/concepts) from the URL as `SHEET_ID` in your .env file
