### Requirements

* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* JDK 7,8 (for uw-frame-java)
* [Maven](http://maven.apache.org) (for uw-frame-java)

### Quick Start

Run a local instance of uw-frame in a matter of minutes using the following steps:

1. Clone the repo: `git clone git@github.com:UW-Madison-DoIT/uw-frame.git`
    - (optional) If you want to use a specific release, checkout its [tag](https://github.com/UW-Madison-DoIT/uw-frame/releases): `git checkout <tag>`
2. Run the following commands:
    ```
    npm install -g grunt-cli
    npm install
    npm run static
    ```
3. Open a browser and go to the location specified in the build output


### Writing an application using uw-frame

#### Java
To begin writing a Java-based uw-frame application, checkout the [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) project. 

This project is a wonderful starting point that will get you up and running quickly. If you only want to run uw-frame using the java module, 
run `npm run jetty` and it'll boot up an embedded jetty container with uw-frame.

#### UW-Frame Static
Use static when you want a simple front end that connects to an independent API in some other application.

There are a couple ways you can create a static frame application.

1. Use the [npm package](https://www.npmjs.com/package/uw-frame). See the [widget creator](https://github.com/UW-Madison-DoIT/myuw-smart-widget-creator) app for an example that uses the package.
2. Use the Docker superstatic container:
    - Build the docker container (`docker build -t myuw/frame .`) and run it to get the frame demo application
    - Run `docker run -v myapp-dir:/data/my-app myuw/frame` to replace the my-app directory with a volume mounted from localhost
    - For deployment, create a Dockerfile like so:
	    ```
		FROM myuw/frame

		COPY ./someapp /data/my-app
		```
	See the [Dockerfile](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/Dockerfile) for specifics.