# jmagine-react-native
React-Native application for Jmagine project
# Installation
- Clone repository
- cd to repo and > npm install
# Install Android Application
- react-native run-android `(Do not forget to install react-native first)`
- Enable Internet connection on your device to fetch data
- To see what react-native native modules we used, check package.json
# Known issues
## Could not get batched Bridge...
![Batched](https://i.stack.imgur.com/WGu6C.png)
 - cd C:/users/'your username'/AppData/Local/Android/sdk/platform-tools
 - >adb reverse tcp:8081 tcp:8081
 -hints :[http://stackoverflow.com/questions/38870710/error-could-not-get-batchedbridge-make-sure-your-bundle-is-packaged-properly](http://stackoverflow.com/questions/38870710/error-could-not-get-batchedbridge-make-sure-your-bundle-is-packaged-properly) 
 ## Could not connect to development server
 -run >npm start after >react-native run-android
 -hit `reload` on your device

