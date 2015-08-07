#### UW Frame

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/uw-frame.svg)](https://travis-ci.org/UW-Madison-DoIT/uw-frame)

The frame is your starting point for a new application.  This has the MyUW header and sidebar. It does still rely on /portal to be in the same container for the session information (name, server, etc...).  If you want to run outside the container just remove those two dependencies and fix the URL's in the side-bar-left.html.

Most applications will use this as a base.  See [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) for a great starter app using this frame.

To run the frame app, just run `mvn jetty:run`

