# uPortal-app-framework

[![No Maintenance Intended](https://unmaintained.tech/badge.svg)](https://unmaintained.tech/)

UNMAINTAINED.

Developers from the University of Wisconsin have been the main developers and maintainers of this software product.

However, in 2022 the University of Wisconsin switched from using this public repo to using
[an internal private repository](https://git.doit.wisc.edu/wps/myuw-service/myuw-legacy/uportal-app-framework)
for continued maintenance of uPortal-app-framework in support of the university's MyUW portal.

As such, this public repository is now effectively unmaintained.

----

Questions? [Get in touch][uportal-user@].

`uPortal-app-framework` is a front-end framework for building web applications that users experience as "apps in the portal".

This package includes the `uPortal-home` header, settings, footer, and some reusable components :

![uPortal app framework screenshot](docs/img/uportal-app-framework-screenshot.png "uPortal app framework")

Learn more about the reusable components on our [docs page](http://uportal-project.github.io/uportal-app-framework/)

## Requirements

* [node](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Java (only if you want a maven artifact)
* [Maven](http://maven.apache.org)
* JDK 7

## Quickstart

uportal-app-framework provides the primary HTML page at the root of the context that hosts your AngularJS single page application. In order to introduce your own content, uportal-app-framework's extension point is 'my-app/main.js'.

### Getting Started with uportal-app-framework

In your existing Maven war project, add the following dependency:

```xml
<dependency>
  <groupId>org.apereo.uportal</groupId>
  <artifactId>uportal-app-framework</artifactId>
  <version>x.y.z</version>
  <type>war</type>
</dependency>
```

(uportal-app-framework is [available in The Central Repository](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.apereo.uportal%22%20AND%20a%3A%22uportal-app-framework%22).)

Start by creating the folder 'src/main/webapp/my-app' within your Maven war project, and copy [uportal-app-framework's main.js](components/my-app/main.js) in to it.
uportal-app-framework includes [RequireJS](http://requirejs.org/) to help you load any additional JavaScript assets you wish, you'll do that in this file.

See [my-app-seed](https://github.com/UW-Madison-DoIT/my-app-seed) for a great starter app using this frame.

### Getting Started with static

This gives you the basic frame in a static content type way. Just add your files to the proper directory and you should be all set. This module is still a work in progress. Note it only works right now as the root context (if you want to change, update the index.html). This module is mostly used for development on the frame itself.

In `components/js/app-config.js` set

* `SERVICE_LOC.portalLayoutRestEndpoint` to `/portal/api/layout`, and
* `SERVICE_LOC.widgetApi.entry` to `staticFeeds/`

to source the mock data for the example the home page showcasing some widgets.

### Testing

We love tests. We setup karma to run our tests.

To run the test suite:

```sh
npm test
```

### Running locally

To build and run on a Superstatic server:

```sh
npm run static:dev
```

### Maven

You can also create a artifact using maven.  There's a pom.xml file in the
root directory.  The maven build will use the normal npm build and
bundle into a deliverable war file.

## Running the documentation

To run the Jekyll docs locally:

```sh
cd docs

bundle exec jekyll serve
```

You may need to install the Jekyll bundler on your machine. See [Jekyll's quick-start guide](https://jekyllrb.com/docs/quickstart/) for instructions.

[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user
