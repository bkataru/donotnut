#!/bin/sh

BUNDLETOOL=/usr/lib/node_modules/bundletool/.bundletool/bundletool-1.0.0.jar

APP=donotnut
KEYSTORE_FILE=donotnut.keystore
KEYSTORE_ALIAS=donotnut-alias
BUILD=dist
RELEASE_AAB=platforms/android/app/build/outputs/bundle/release/app-release.aab

rm -rf $BUILD $RELEASE_AAB
cordova build android --prod --release --buildConfig

java -jar $BUNDLETOOL build-apks --mode=universal --bundle=$RELEASE_AAB --output=$APP.apks --ks=$KEYSTORE_FILE --ks-key-alias=$KEYSTORE_ALIAS
mv $APP.apks $APP.zip
unzip $APP.zip -d $BUILD
rm -rf $APP.zip
mv $BUILD/universal.apk $BUILD/$APP.apk