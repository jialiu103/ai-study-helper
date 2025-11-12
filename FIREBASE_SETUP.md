# Firebase Setup Guide for Lexio

## Step 1: Create Firebase Project (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Project name: `lexio` (or whatever you prefer)
4. Disable Google Analytics (not needed for now)
5. Click **"Create project"**

## Step 2: Enable Google Authentication (2 minutes)

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click **"Google"**
5. Toggle **"Enable"**
6. Enter support email (your email)
7. Click **"Save"**

## Step 3: Enable Firestore Database (2 minutes)

1. In Firebase Console, click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set rules next)
4. Select location: `us-central` or closest to your users
5. Click **"Enable"**

## Step 4: Set Firestore Security Rules (1 minute)

1. In Firestore, click **"Rules"** tab
2. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

## Step 5: Register Web App (3 minutes)

1. In Firebase Console, click ⚙️ (Settings) → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click **"</>"** (Web icon)
4. App nickname: `lexio-web`
5. Check **"Also set up Firebase Hosting"** (optional)
6. Click **"Register app"**
7. **COPY the Firebase config** - you'll need this! It looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "lexio-xxxxx.firebaseapp.com",
  projectId: "lexio-xxxxx",
  storageBucket: "lexio-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

8. Click **"Continue to console"**

## Step 6: Update Lexio Code

After you complete the above steps:

1. **Copy your Firebase config** from Step 5
2. **Tell me your Firebase config** and I'll update the code
3. OR **I'll create a template** and you paste your config

---

## Security Notes

✅ **Firebase API key is PUBLIC** - It's safe to expose in frontend code  
✅ **Firestore rules protect data** - Users can only access their own words  
✅ **OpenAI API key stays hidden** - Still in Cloudflare Worker

---

**Once you complete these steps, tell me and I'll update the code!** 🚀
