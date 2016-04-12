# Ionic App
this is an ionic mobile application sample.

### Installion
1. First install [NodeJs](https://nodejs.org).
2. Then you need to install cordova & ionic , so open your command line or terminal and type ($ npm install -g cordova ionic).
3.  Follow the [Android](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/android/index.html) and [iOS](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/ios/index.html) platform guides to install required platform dependencies.

### Run it
1. Download or clone the app and open your terminal & go to the project folder.
2. Add the platform you want , for android type($ ionic platform add android) and for ios type($ ionic platform add ios)
3. Add these cordova plugins to your project (cordova-plugin-statusbar , cordova-plugin-whitelist , cordova-plugin-device , cordova-plugin-network-information , cordova-plugin-camera , cordova-plugin-file-transfer ) by typing ($ cordova plugin add thePluginName).
4. test the app on the browser by typing ($ ionic serve --lab).

### Other information
This app makes http requests to a REST Api hosted on heroku and this is the [link](https://github.com/mahmoud-adel-sayed/node-rest-api) to project sample.
