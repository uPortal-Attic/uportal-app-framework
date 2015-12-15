# UW Frame

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/uw-frame.svg)](https://travis-ci.org/UW-Madison-DoIT/uw-frame)

[![Coverage Status](https://coveralls.io/repos/UW-Madison-DoIT/uw-frame/badge.svg?branch=master&service=github)](https://coveralls.io/github/UW-Madison-DoIT/uw-frame?branch=master)

[![codenvy factory](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=au4tpiai3n1ygpy1)

uw-frame can be described as the "the framework for building applications for campus using modern technologies".  
This package includes the MyUW header, settings, footer, and some reusable components :

![uw-frame screenshot](uw-frame-screenshot.png "UW Frame")

Learn more about the reusable components on our [docs page](http://uw-madison-doit.github.io/uw-frame/)

## Requirements

* [node](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [Bower](http://bower.io/)

### Static Pages

* [http-server](https://www.npmjs.com/package/http-server)

### Java
* [Maven](http://maven.apache.org)
* JDK 7

## Getting started

uw-frame provides the primary HTML page at the root of the context that hosts your AngularJS single page application. In order to introduce your own content, uw-frame's extension point is 'my-app/main.js'.

### Getting Started with uw-frame-java

In your existing Maven war project, add the following dependency:

```
<dependency>
  <groupId>edu.wisc.my.apps</groupId>
  <artifactId>uw-frame</artifactId>
  <version>x.y.z</version>
  <type>war</type>
</dependency>
```

(uw-frame-java is [available in The Central Repository](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22edu.wisc.my.apps%22%20AND%20a%3A%22uw-frame%22).)

Start by creating the folder 'src/main/webapp/my-app' within your Maven war project, and copy [uw-frame's main.js](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/src/main/webapp/my-app/main.js) in to it.
uw-frame includes [RequireJS](http://requirejs.org/) to help you load any additional JavaScript assets you wish, you'll do that in this file.

See [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) for a great starter app using this frame.

### Getting Started with uw-frame-static

This gives you the basic frame in a static content type way. Just add your files to the proper directory and you should be all set. This module is still a work in progress. Note it only works right now as the root context (if you want to change, update the index.html). This module is mostly used for development on the frame itself.

### Testing

We love tests. We setup karma to run our tests.

To run the test suite:

> npm test

### Contributing

You can run uw-frame locally with the following command:

java:
> npm run jetty

or 

static:
> npm run static

### Common Issues

* Bower installed? If you see an error like the following from the Maven build, it means you haven't properly installed Bower (check that it's installed and on your path):

> [ERROR] Failed to execute goal org.codehaus.mojo:exec-maven-plugin:1.3.2:exec (default) on project uw-frame: Command execution failed. Cannot run program "bower" (in directory "uw-frame-java/src/main/webapp"): error=2, No such file or directory -> [Help 1]
