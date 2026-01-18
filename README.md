# My Pokedex

This is a project created mainly to learn more about React Native.

Headline feature of this project is auto-compute of best attacker Pokemon type against multi-typed defenders/raid boss.

## Setup

```zsh
npm i
npm run start
```

If you face error `development build not installed on device`, then run either `npm run android` or `npm run ios`, depending on your target platform.

## Build

### Android

To create an .apk file for sideloading onto Android devices:

```zsh
cd android
./gradlew assembleRelease
```

The build output will be located at `./android/app/build/apk/release`

To clean build:

```bash
npx expo prebuild --platform android --clean
```
