FROM ubuntu:latest

# Switch to bash since 'source' does not work in /bin/sh
SHELL ["/bin/bash", "-c"]

RUN apt update -y && apt upgrade -y

# Tools
RUN apt install -y git curl wget unzip vim

WORKDIR /workspace

# Node & npm
RUN curl -sL https://deb.nodesource.com/setup_20.x -o nodesource.sh && bash nodesource.sh && rm nodesource.sh
RUN apt install -y nodejs

# Cordova
RUN npm install -g cordova

ARG PROFILE=/root/.profile

# Java
RUN apt install -y default-jdk
RUN echo "export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64" >> ${PROFILE}

# Gradle
RUN wget -c https://services.gradle.org/distributions/gradle-8.6-bin.zip -P .
RUN unzip -d /opt/gradle gradle-8.6-bin.zip
RUN export GRADLE_HOME=/opt/gradle/gradle-8.6

# Android SDK
RUN export ANDROID_HOME=/opt/android/sdk
RUN mkdir -p $ANDROID_HOME
RUN mkdir $ANDROID_HOME/temp
WORKDIR $ANDROID_HOME/temp
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-9123335_latest.zip
RUN unzip commandlinetools-linux-9123335_latest.zip
RUN mkdir -p $ANDROID_HOME/cmdline-tools/tools
RUN mv $ANDROID_HOME/temp/cmdline-tools/* $ANDROID_HOME/cmdline-tools/tools
RUN rm -rf $ANDROID_HOME/temp

RUN echo "export PATH=$ANDROID_HOME/cmdline-tools/tools/bin/:$ANDROID_HOME/platform-tools/:$GRADLE_HOME/bin:$PATH" >> ${PROFILE}
RUN source ${PROFILE}

WORKDIR /workspace

# Install bundletool
RUN npm install -g bundletool

# Install and configure sdkmanager
RUN apt install -y sdkmanager
RUN sdkmanager --install "platform-tools" "build-tools;33.0.2" "platforms;android-33"

COPY .. .