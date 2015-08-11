# UW Frame

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/uw-frame.svg)](https://travis-ci.org/UW-Madison-DoIT/uw-frame)

[![codenvy factory](https://codenvy.com/factory/resources/factory-white.png)](https://codenvy.com/factory?id=au4tpiai3n1ygpy1)

The frame is your starting point for a new application.  This has the MyUW header and sidebar. It does still rely on /portal to be in the same container for the session information (name, server, etc...).  If you want to run outside the container just remove those two dependencies and fix the URL's in the side-bar-left.html.

Most applications will use this as a base.  See [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) for a great starter app using this frame.

To run the frame app, just run `mvn jetty:run`

## Requirements

`uw-frame` requires [Bower](http://bower.io/).  Without Bower, Maven will give you an error along the lines of

> [ERROR] Failed to execute goal org.codehaus.mojo:exec-maven-plugin:1.3.2:exec (default) on project uw-frame: Command execution failed. Cannot run program "bower" (in directory "/Users/apetro/code/github_uw/uw-frame/src/main/webapp"): error=2, No such file or directory -> [Help 1]
