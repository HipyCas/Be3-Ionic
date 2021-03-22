# :bee: The Be3 Project Official Dashboard

The Be3 Project official web and native dashboard built with Ionic for fast, intuitive and multi-platform management of your Be3 installation and visualizing the data collected

## Robust framework and 24h team

// This shouldn't be on the README really

Built with fully open-source technologies that have been in development for many years now, ensuring a robust, secure and feature-full framework. This combined with a full-day support technical team makes the Be3 Dashboard flawless and.

## Official instance

From The Be3 Project team itself, an online dashboard is online and working, with its very own server and with its own connected Be3 Sense devices. For anyone looking to use this as business, or even as an individual, they should definitely take a look at this ready-to-use and zero-config official instance, with 24h support, effortless setup, remotely managed by our expert team and native clients (Android, Apple and PC) ready to install. To take a look at our highly recommendable instance and how to get started, go to our [official webpage](https://be3.project).

// Link will probably change

## Documentation

A full documentation, both for users of the dashboard and IT specialists, or simply coders or hobbyists, working on an instance, is available at [hipycas.gitbook.io/be3](https://hipycas.gitbook.io/be3). This documentation has been put together with GitBook, a free yet powerful online documentation software. The documentation is also available as Markdown files under the [docs/]() folder in this same repository. In this README, only a brief guideline of the installation is provided, for a more in-depth one, head to the previously mentioned documentation.

## Running locally

The dashboard uses the Ionic framework with Vue as underlining JavaScript framework. For running locally, you can run the NPM serve script, although it is not recommended, as it is slower than a development build and has hot module reloading. For running the dashboard, it is recommended to build the Ionic project and serve it via Apache or Nginx or creating a server for serving the files. For building, you can simply run the `build` NPM script, as shown below:

```sh
npm i
npm run build
```

The way of serving the built assets is up to you!

## Building native apps

For building the native apps, there are different requirements for each app that you want to build. So far, you should have already installed `@capacitor/core` and all related packages as dev dependencies. Also, remember that Capacitor uses you distribution code, which means that you should have a fresh build before going further.

### Android

Building for android requires the Android SDK and arguably Android Studio IDE, although you probably can get along without it (we are going to use it for these instructions). For building for Android, run the following commands:

```sh
npx cap add android
npx cap copy android # Can use sync instead of copy
npx cap open android # This launches Android Studio with the app open
```

Having Android Studio open, build the APK (or signed APK) and get it on your device for installation!

//


### iPhone

Building for iPhone, as opposite as for Android, requires you to have a Mac and  a working installation of XCode available. That is the reason why, as of now, The Be3 Project team does not officially distribute any native version of the app for iPhone. If you have the Mac and XCode installation, run the following commands for creating the iPhone app:

```sh
npx cap add ios
npx cap copy ios # As with Android, sync should also work
npx cap open ios # This launches XCode with the app open
```

With XCode open, follow the usual building process.

### PC (Windows, Linux, Mac, etc.)

_Coming soon..._
