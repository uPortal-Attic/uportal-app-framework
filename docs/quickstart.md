# Getting started quickly with uportal-app-framework

## Requirements

* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* JDK 7,8
* [Maven](http://maven.apache.org)

## Quick start

Run a local instance of `uportal-app-framework` in a matter of minutes in 3 easy steps.

### 1. Clone

Clone the repo:

```shell
git clone git@github.com:UW-Madison-DoIT/uw-frame.git
```

To use a specific release, checkout its [tag](https://github.com/UW-Madison-DoIT/uw-frame/releases):

```shell
git checkout <tag>
```
otherwise the `git clone` defaults to the latest code.

### 2. Install and run using Node

Run these commands:

```shell
npm install
npm run static:dev
```

### 3. View in browser

Open a web browser and go to the location specified in the build output.


## Writing an application using uportal-app-framework

### Java
To begin writing a Java-based uportal-app-framework application, checkout the [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) project.

This project is a wonderful starting point that will get you up and running quickly. If you only want to run uportal-app-framework using the Java module,
run `npm run jetty` and it'll boot up an embedded jetty container with uportal-app-framework.

### uportal-app-framework Static
Use static when you want a simple front end that connects to an independent API in some other application.

There are a couple ways you can create a static frame application.

#### One way: the Node package

Use the [npm package](https://www.npmjs.com/package/uw-frame). See the [widget creator](https://github.com/UW-Madison-DoIT/widget-creator) app for an example that uses the package.

#### Another way: the Docker container

Use the Docker superstatic container:

1. Build the docker container (`docker build -t myuw/frame .`) and run it to get the frame demo application
2. Run `docker run -v myapp-dir:/data/my-app -p 8009:8009 myuw/frame` to replace the my-app directory with a volume mounted from localhost
3. For deployment, create a Dockerfile like so:

```Dockerfile
FROM myuw/frame

COPY ./someapp /data/my-app
```

See the [Dockerfile](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/Dockerfile) for specifics.
