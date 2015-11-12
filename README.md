# UW Frame

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/uw-frame.svg)](https://travis-ci.org/UW-Madison-DoIT/uw-frame)

[![codenvy factory](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=au4tpiai3n1ygpy1)

uw-frame can be described as the "war dependency that you will need to overlay when creating a new My UW 'App'".  
uw-frame is a Servlet 2.5 web application that provides provides the primary HTML page at the root of the servlet context that hosts your AngularJS single page application.
That includes the My UW header and sidebar:

![uw-frame screenshot](uw-frame-screenshot.png "UW Frame")


It does still rely on /portal to be in the same container for the session information (name, server, etc...).  If you want to run outside the container just remove those two dependencies and fix the URL's in the side-bar-left.html.

## Requirements

* [Bower](http://bower.io/)
* [Maven](http://maven.apache.org) 
* JDK 7 

## Getting Started

In your existing Maven war project, add the following dependency:

```
<dependency>
  <groupId>edu.wisc.my.apps</groupId>
  <artifactId>uw-frame</artifactId>
  <version>x.y.z</version>
  <type>war</type>
</dependency>
```

(uw-frame is [available in The Central Repository](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22edu.wisc.my.apps%22%20AND%20a%3A%22uw-frame%22).)

uw-frame provides the primary HTML page at the root of the servlet context that hosts your AngularJs single page application. In order to introduce your own content, uw-frame's extension point is 'my-app/main.js'.

Start by creating the folder 'src/main/webapp/my-app' within your Maven war project, and copy [uw-frame's main.js](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/src/main/webapp/my-app/main.js) in to it.
uw-frame includes [RequireJS](http://requirejs.org/) to help you load any additional JavaScript assets you wish, you'll do that in this file.

See [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) for a great starter app using this frame.

### Contributing

You can run uw-frame locally with the following command:

> mvn install jetty:run

### Common Issues

If you see an error like the following from the Maven build, it means you haven't properly installed Bower (check that it's installed and on your path): 

> [ERROR] Failed to execute goal org.codehaus.mojo:exec-maven-plugin:1.3.2:exec (default) on project uw-frame: Command execution failed. Cannot run program "bower" (in directory "<project-root>/src/main/webapp"): error=2, No such file or directory -> [Help 1]
