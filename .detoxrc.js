module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js',
      maxWorkers: 1
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'npx expo prebuild --platform android --no-install && cd android && ./gradlew -Dorg.gradle.jvmargs="-Xmx4096m -XX:MaxMetaspaceSize=1024m" assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    'emulator': {
      type: 'android.attached',
      device: {
        adbName: 'emulator-5554'
      }
    }
  },
  configurations: {
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
