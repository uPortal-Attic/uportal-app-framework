# How did we get marked content?

You may be wondering, "how did we inject `ngMarked` into uw-frame for this docs page, it doesn't ship with frame?!?" Easy! Kind-of.

For this step-by-step we did this to my-app-seed (for Java applications). That [branch can be found on github](https://github.com/UW-Madison-DoIT/my-app-seed/tree/inject-bower-artifacts) but won't be merged because only some developers need to inject external components.

## Step 1 - Step your `bower.json` and `.bowerrc`
In the `src/main/webapp` there should be 2 bower files. In `bower.json` you can add in any bower dependency under the sun. The bower rc file is there so bower packages downloaded during bower install (step 3) will go into `src/main/webapp/vendor` instead of `bower_components`. This removes the possibility of overriding `bower_components` that are shipped with uw-frame's war file.

### .bowerrc
```
{
  "directory" : "vendor"
}
```

### bower.json
```
{
  "name": "my-app-seed",
  "version": "1.0.0",
  "homepage": "https://github.com/UW-Madison-DoIT/my-app-seed",
  "authors": [
    "Tim Levett <tim.levett@wisc.edu>"
  ],
  "moduleType": [
    "amd",
    "node"
  ],
  "license": "MIT",
  "dependencies": {
    "angular-marked": "~1.0.1"
  },
  "devDependencies": {}
}
```

Notice, you have to make sure that you are pulling in dependencies that match what is shipped with uw-frame. I know its not perfect but alas.

## Step 2 - Running `bower install` during build

There are many ways you can run `bower install` while building a frame app. If you are using the Java module you can either do a `maven-exec-plugin` or inject the `frontend-maven-plugin`. If you are creating a static app, you can just run it as part of your [build script](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/docs/build.sh#L14). This docs page is an [example of that](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/docs/build.sh#L14).

### `maven-exec-plugin`
In the [`pom.xml` of this application](https://github.com/UW-Madison-DoIT/my-app-seed/blob/inject-bower-artifacts/my-app-seed-war/pom.xml#L34) we call `bower install` in the webapp directory, and put the things in `bower.json` into `vendor/`. Yes this does require that you have bower installed on your dev machine, but who doesn't?

### `frontend-maven-plugin`

Documented on their [gh page](https://github.com/eirslett/frontend-maven-plugin).

## Step 3 - paths and shims
Now that we have artifacts to inject, lets inject them into the `requirejs` configuration. We inject `marked` and `ngMarked` into this project via the `/my-app/app-config.js`.

Here is the content of that file:
```
'use strict';
define([], function() {

  return {
    paths : {
      'marked'        : "vendor/marked/lib/marked",
      'ngMarked'      : "vendor/angular-marked/dist/angular-marked"
    },

    shims : {
      'ngMarked'      : { deps: ['marked','angular']}
    }

  }
});
```

As you can see it just returns an object with paths and shims with the relative path (webapp being the working directory here) to the artifacts.
Curious to learn more, checkout [/config.js](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/config.js) in uw-frame's repository. Basically it takes this returned object and merges it in with the frame configuration.

## Step 4 : Injecting the angular module into your app

Now that require knows about the artifact, we can now use that module in our angular configuration. Checkout the `my-app/main.js`. As you can see we are injecting marked and ngMarked, then adding the `'hc.marked'` module.

And that should be it. Holler with questions, or weird edge cases.
