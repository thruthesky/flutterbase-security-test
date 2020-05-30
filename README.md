# flutterbase-security-test

## Installation


* Run firestore emulator

```
$ firebase emulators:start --only firestore
```

* Git clone the source code

```
$ git clone https://github.com/thruthesky/flutterbase-security-test
```

* Update `.firebaserc` for your project.


* Run the test

```
$ npm run test
$ npm run test:admin
$ npm run test:post
```

## Publish

* When tests are complete, deploy like below

```
$ firebase deploy --only firestore
```

