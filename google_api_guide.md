# Google Cloud API Key Generation Guide

Follow these exact steps to generate your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for the Calendar and Auth integration.

## Step 1: Create a Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Log in with your primary Google/Gmail account.
3. In the top-left corner (next to the Google Cloud logo), click the **Select a project** dropdown.
4. Click **New Project** in the top right of the popup window.
5. Name it something like `Workspace Dashboard` and click **Create**.
6. Wait a few seconds, then make sure this new project is selected in the top-left dropdown.

## Step 2: Enable the Required APIs
1. In the left-hand sidebar menu, go to **APIs & Services > Library**.
2. In the search bar, type `Google Calendar API`.
3. Click on **Google Calendar API** and click the blue **Enable** button.
4. (Optional but recommended) Go back to the Library, search for `Gmail API`, and Enable it as well for future use.

## Step 3: Configure the OAuth Consent Screen
1. In the left sidebar, go to **APIs & Services > OAuth consent screen**.
2. Choose **External** (unless you have a Google Workspace paid account, then you can choose Internal) and click **Create**.
3. Fill out the mandatory fields:
   - **App name:** `Workspace App` (or whatever you prefer)
   - **User support email:** Select your email address.
   - **Developer contact information:** Put your email address again.
4. Scroll down and click **Save and Continue**.
5. **Scopes Screen:** You don't need to manually add scopes here, just scroll down and click **Save and Continue**.
6. **Test Users Screen:** This is **CRITICAL**. Click **+ ADD USERS**. Type your exact Gmail address (the one you will use to log into the app) and click Add. Then click **Save and Continue**.
7. Click **Back to Dashboard**.

## Step 4: Generate the API Keys
1. In the left sidebar, click on **Credentials**.
2. Click **+ CREATE CREDENTIALS** at the top of the page, and select **OAuth client ID**.
3. Under **Application type**, select **Web application**.
4. Name it `Next.js App` (or anything).
5. Scroll down to **Authorized redirect URIs**.
6. Click **+ ADD URI** and paste exactly this:
   `http://localhost:3000/api/auth/callback/google`
   *(Note: If your dev server is running on `3001`, add a second URI for `http://localhost:3001/api/auth/callback/google` just in case)*
7. Click **Create**.

## Step 5: Copy to Your `.env` File
1. A popup will appear showing your **Client ID** and **Client Secret**.
2. Open your project folder in VS Code.
3. Find the `.env` file (or create one in the root folder if it doesn't exist).
4. Paste the keys like this:

```env
GOOGLE_CLIENT_ID="PASTE_YOUR_CLIENT_ID_HERE"
GOOGLE_CLIENT_SECRET="PASTE_YOUR_CLIENT_SECRET_HERE"

# Required by NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="my-super-secret-key-123" 
```

## Step 6: Restart and Login
1. Stop your terminal server (`npm run dev`) by pressing `Ctrl + C`.
2. Start it again with `npm run dev`.
3. Go to your app in the browser.
4. **Sign out** if you are already signed in.
5. Click **Sign in with Google**.
6. Google will warn you that "Google hasn't verified this app". Because it's your own private app, click **Continue** or **Advanced -> Go to Workspace App (unsafe)**.
7. Grant the calendar permissions.
8. Done! Your Calendar page will now perfectly sync!
