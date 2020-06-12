# flutterbase-security-test

## Installation


* Git clone the source code

```
$ git clone https://github.com/thruthesky/flutterbase-security-test
```

* Update `.firebaserc` for your project.


## Test

* Run firestore emulator

```
$ firebase emulators:start --only firestore
```

* Run the test

```
$ npm run test
$ npm run test:admin
$ npm run test:post
$ npm run test:user.token
```

## Publish

* When tests are complete, deploy like below

```
$ firebase deploy --only firestore
```

