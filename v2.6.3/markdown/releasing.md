Release engineering for uw-frame is pretty automated. We actually only have to do a few things.

### Select a version

Look at the [closed pull requests](https://github.com/UW-Madison-DoIT/uw-frame/pulls?q=is%3Apr+is%3Aclosed) that were done since the last release. There should be tags on pull requests that deem a release: major, minor, or patch (x.y.z respectively).

Now that you have a version you need to update that in a few places.

### Release steps

+ Update the npm package by running `npm version <update_type>` where <update_type> is based on the selection above: patch, minor, or major. This will: change the version in `package.json`, commit that (locally), and make a tag in the format `vx.y.z`. Read more about that [on npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages#updating-the-package).
+ Deploy npm package to the world; `npm publish`. (if you don't have contribution rights contact authors)
+ Push git changes to the github via `git push origin master` and `git push origin <tag>`
+ Now do release for Java.

```
cd uw-frame-java
mvn release:prepare
mvn release:perform
```

_Iff it went well_
```
git push origin master
git push origin uw-frame-maven-<version>
```

+ Release maven artifacts from central staging repository
+ Deploy a new version to `docker.doit.wisc.edu` (note the version below x.y.z should be the release version)

```
git checkout vx.y.z
docker build -t docker.doit.wisc.edu/myuw/uw-frame-superstatic:x.y.z .
docker push docker.doit.wisc.edu/myuw/uw-frame-superstatic:x.y.z
```

+ Create release docs on gh-pages (Jenkins job) using the tag created for bower.

### Documentation branching

+ Update version.md to have the latest tag as a folder
+ Run jenkins job to release a new version of the documentation
+ Verify you can get to that version of the documentation on gh-pages
