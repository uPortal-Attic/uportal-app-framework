#### UW Frame
The frame is your starting point for a new application.  This has the MyUW header and sidebar. It does still rely on /portal to be in the same container for the session information (name, server, etc...).  If you want to run outside the container just remove those two dependencies and fix the URL's in the side-bar-left.html.

To deploy the frame build from the base directory described above. Then `cd ./uw-frame` and run `mvn tomcat7:redeploy` (assuming you have auto deploy configured).  The frame will now be deployed to /frame.

Most applications will use this as a base.  See [my-app-seed]() for a great starter app using this frame.
