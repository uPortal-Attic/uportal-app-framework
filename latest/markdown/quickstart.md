### Requirements

* [node](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

If you want to utilize the uw-frame-java module you will need this in addition to the things listed above:

* JDK 7,8
* [Maven](http://maven.apache.org)

### Setup/Install uw-frame

If you want to just checkout uw-frame and see what it offers, you can run a local instance in a matter of minutes using the following steps:

+ Clone the repo: `git clone git@github.com:UW-Madison-DoIT/uw-frame.git`
+ If you want to use a specific release checkout that [tag](https://github.com/UW-Madison-DoIT/uw-frame/releases): `git checkout <tag>`
+ exec `npm install`
+ exec `npm run static`
+ Launch browser at the location specified in the build output

This is the uw-frame application. It provides some basic pages that you can poke around with and checkout.

### Writing an application using the uw-frame

#### Java
To write a Java based uw-frame application, checkout the [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) project on github. This project is a wonderful starting point where you should be able to just clone the repository and off you go. If you wanted to run just uw-frame using the java module, just run `npm run jetty` and it'll boot up a embedded jetty container with uw-frame.

#### PHP
_Coming Soon_

#### Static
Steps for running uw-frame in a static way is documented above. If you want to use the uw-frame-components, you can just pull the npm dependency in. See the [npm package](https://www.npmjs.com/package/uw-frame) for that information. If you are curious how you would write something like that, checkout the `build.sh` in the `uw-frame-static` module.