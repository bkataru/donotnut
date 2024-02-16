#!/bin/sh

KEYSTORE_FILE=donotnut.keystore
KEYSTORE_ALIAS=donotnut-alias

keytool -genkey -v -keystore $KEYSTORE_FILE -keyalg RSA -keysize 2048 -validity 10000 -alias $KEYSTORE_ALIAS