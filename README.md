An open source project for coffee enthusiasts.


## Start

If you're not familiar with Ionic or cordova, get started here: http://ionicframework.com/docs/intro/installation/

After this run, to install all dependencies

```bash
cd beanconqueror
npm install --save
```

## Plugin Requirements

https://ionicframework.com/docs/storage/
```bash
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
```


https://stackoverflow.com/questions/39893257/using-moment-js-package-in-ionic-2-project
```bash
npm install moment --save
```

http://ionicframework.com/docs/native/app-minimize/
```bash
ionic cordova plugin add cordova-plugin-appminimize
npm install --save @ionic-native/app-minimize
```

http://ionicframework.com/docs/native/media-capture/
```bash
ionic cordova plugin add cordova-plugin-media-capture
npm install --save @ionic-native/media-capture
```

http://ionicframework.com/docs/native/image-picker/
```bash
ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="Bitte um Freigabe"
npm install --save @ionic-native/image-picker
```

