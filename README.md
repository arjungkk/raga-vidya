# Raga Vidya

A personal Android app for learning Carnatic ragas on keyboard and guitar, with an AI-powered raga identifier.

Built as a WebView app: the entire UI lives in `app/src/main/assets/` as plain HTML, CSS, and JavaScript. The Android layer is a thin wrapper that handles permissions and loads the web app locally, so it works fully offline (except for the AI identification feature, which calls the Anthropic API).

---

## What the app does

**Raga Explorer** - Browse all 72 melakarta (parent) ragas and 41 janya (derived) ragas. Each raga shows the ascending and descending scale, the key notes (vadi and samvadi), characteristic phrases, time of day, and mood. Every swara is labeled with its Western equivalent so beginners and Western musicians can follow along without prior knowledge of Carnatic notation.

**Keyboard** - An interactive two-octave piano that highlights the notes of any raga. Select arohana or avarohana to see which keys are used, then press Play to hear the scale. Includes loop mode and tempo control.

**Guitar** - The same idea on a 13-fret standard-tuning fretboard. Highlighted dots show where the raga's notes fall across all six strings.

**Raga Identifier** - Two modes: describe a raga in words or swara notation, or hold the record button and hum/sing a melody. The Anthropic API listens and returns the most likely raga with an explanation.

---

## Project structure

```
app/src/main/assets/
    index.html              Main HTML shell, loads all modules in order
    css/
        base.css            CSS variables, layout, navigation, shared components
        explorer.css        Raga list, detail panel, swara pills
        keyboard.css        Piano key styles
        guitar.css          Fretboard styles
        identify.css        Recording UI, result card
    js/
        data/
            ragas.js        All 113 ragas: NOTE_NAMES, SWARA_SEMITONES, RAGAS array
        state.js            Centralised mutable state (selected raga, tempo, etc.)
        audio.js            AudioContext singleton, playNote()
        notation.js         Maps Carnatic notation to Western equivalents and solfege
        explorer.js         Raga list filtering, detail panel rendering
        keyboard.js         Piano rendering, sequence playback, loop
        guitar.js           Fretboard rendering, sequence playback, loop
        identify.js         Text and audio raga identification via API
        app.js              App init, tab navigation, bootstraps all modules
app/src/main/
    AndroidManifest.xml
    java/com/ragavidya/app/
        MainActivity.java   WebView shell with runtime permission handling
    res/
        layout/activity_main.xml
        values/strings.xml
        values/colors.xml
        mipmap-*/           App icons at all densities
```

---

## Building the APK

### What you need

- Java 17 or 21 (from https://adoptium.net)
- Android SDK command-line tools (from https://developer.android.com/studio#command-line-tools-only)
- Gradle 8.4 (already bundled in the project via the wrapper)

### One-time Android SDK setup

**1. Install Java**

Download and run the JDK 17 installer from https://adoptium.net. The installer sets JAVA_HOME automatically.

**2. Install Android SDK tools**

Download the Windows command-line tools zip, unzip it, and arrange the folder like this:

```
C:\android-sdk\
    cmdline-tools\
        latest\
            bin\
            lib\
```

The `latest` folder is what you create by renaming the inner folder that comes out of the zip.

**3. Set environment variables**

Open Start, search for "Edit the system environment variables", and add:

- New variable: `ANDROID_HOME` = `C:\android-sdk`
- Add to `Path`: `C:\android-sdk\cmdline-tools\latest\bin`
- Add to `Path`: `C:\android-sdk\platform-tools`

Open a new Command Prompt after saving.

**4. Install SDK packages**

```cmd
sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

This downloads around 500 MB. Only needed once.

**5. Install Gradle**

Download the Gradle 8.4 binary zip from https://gradle.org/releases/ and extract it somewhere permanent, for example `C:\gradle-8.4`. Add `C:\gradle-8.4\bin` to your `Path`.

Then generate the wrapper jar inside the project:

```cmd
cd D:\projects\RagaVidya
gradle wrapper --gradle-version 8.4
```

### Building

```cmd
cd D:\projects\RagaVidya
.\gradlew assembleDebug
```

The APK ends up at:

```
app\build\outputs\apk\debug\app-debug.apk
```

### Getting it onto your phone

**Via USB (fastest)**

Enable Developer Options on your phone: Settings > About Phone > tap Build Number seven times. Then enable USB Debugging under Developer Options. Connect the phone, then run:

```cmd
adb install app\build\outputs\apk\debug\app-debug.apk
```

**Without a cable**

Copy the APK file to your phone by any means (USB drive, Google Drive, email to yourself). Tap the file on the phone and install it. Android will ask you to allow installations from unknown sources the first time.

---

## Making changes

Since the entire app runs in the WebView, most changes only require editing files in `app/src/main/assets/` and rebuilding the APK. No Java changes are needed for UI or feature work.

| What you want to change | File to edit |
|---|---|
| Add or correct a raga | `js/data/ragas.js` |
| Change swara-to-Western mappings | `js/notation.js` |
| Change how the raga list or detail looks | `js/explorer.js` and `css/explorer.css` |
| Change keyboard layout or colours | `js/keyboard.js` and `css/keyboard.css` |
| Change fretboard layout | `js/guitar.js` and `css/guitar.css` |
| Change AI prompt or recording behaviour | `js/identify.js` |
| Change fonts, colours, or global layout | `css/base.css` |
| Change nav or startup behaviour | `js/app.js` |

---

## Permissions

The app requests two permissions:

- **Internet**: used only by the Raga Identifier tab to call the Anthropic API. The rest of the app works offline.
- **Record Audio**: used by the "Sing / Hum" mode in the Raga Identifier. On first use Android will show a permission dialog; the app handles the response and grants the WebView access automatically.

---

## Notes

- Minimum Android version: 7.0 (API 24), which covers virtually all active Android devices.
- The AI identification uses the `claude-sonnet-4-20250514` model via the Anthropic API. You need an internet connection and a valid API key for that feature to work.
- The old single-file version (`carnatic_raga_app.html`) is still in the assets folder for reference but is not loaded by the app.
