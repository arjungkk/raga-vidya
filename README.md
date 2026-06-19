# Raga Vidya - Android App

## Prerequisites
- Android Studio (Hedgehog 2023.1.1 or newer)
- Android SDK 34
- Java 8+

## Setup

1. **Open the project**
   - Open Android Studio -> File -> Open -> select this `RagaVidya/` folder

2. **Sync Gradle**
   - Android Studio will prompt to sync - click "Sync Now"
   - First sync downloads Gradle (~100MB), wait for it to finish

3. **Run on your phone**
   - Enable Developer Options on your Android phone:
     Settings -> About Phone -> tap "Build Number" 7 times
   - Enable USB Debugging:
     Settings -> Developer Options -> USB Debugging -> ON
   - Plug phone into PC via USB
   - In Android Studio, select your device from the device dropdown
   - Click Run (Shift+F10)

4. **Install as APK (no USB)**
   - Build -> Build Bundle(s)/APK(s) -> Build APK(s)
   - APK will be at: app/build/outputs/apk/debug/app-debug.apk
   - Transfer this file to your phone (WhatsApp, email, Google Drive, etc.)
   - On the phone: tap the APK -> Install
   - You may need to enable "Install from unknown sources" in Settings

## Updating the app

To update the HTML/JS (new ragas, bug fixes etc.):
1. Edit `app/src/main/assets/carnatic_raga_app.html`
2. Re-run / rebuild the APK

No Java changes needed - all the app logic lives in the HTML file.

## Notes

- Internet permission is included for the AI Identify tab (Anthropic API)
- Web Audio API works fully on Android WebView
- Tested on Android 7.0+ (minSdk 24)
- The app runs fully offline except for the AI Identify feature
