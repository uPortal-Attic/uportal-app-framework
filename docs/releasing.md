# uPortal-app-framework release engineering

Release engineering for `uPortal-app-framework` is pretty automated. We actually only have to do a few things.

## Release authorization

This project has [adopted Apache rules][] with necessary or pragmatic local adaptations.

Release authorization, or the delegation of release authority to one or more release engineers, should be documented by [a suitable vote][Apache Release Policy re Release Approval] of [the uPortal-app-framework Committers][] on [uportal-dev@][].

## Select a version

### Labeling pull requests

Look at the [closed pull requests][uw-frame closed pull requests] that were done since the last release. There should be labels on pull requests communicating what kind of release it's appropriate to include them in: major, minor, or patch (x.y.z respectively). (See [Semantic Versioning][], especially if you're adding missing change-type labels on those closed pull requests.)

### Determining the release version from those labels

The next release should be the least-significant kind of release appropriate to include all the changes. For example, if it's all patch-appropriate change, you're cutting a patch release, but if there's even just one breaking change, it's a major release.

Now that you have a version you need to update that in a few places.

### Milestone in GitHub

+ [Create a milestone][uw-frame milestones] named for the version you're cutting, if it does not yet exist.
+ If using an existing milestone, ensure nothing is currently erroneously marked with that milestone, e.g. open pull requests or issues that someone hoped might be resolved for this version but alas were not. You can examine this by simply [clicking the milestone's name][uw-frame milestones] to view the milestone.
+ Mark the [pull requests that merged to `master`][uw-frame closed pull requests] since the previous release with that milestone.
+ [Close the milestone][uw-frame milestones].

Tada! The pull requests in this release now say the version they released in right on them. And there's a handy milestone that rolls up all the pull requests in this version.

## Release steps

### Finalize documentation

Before cutting the release, do what you can to square away the documentation for the release. The documentation is in the `docs` folder right in the codebase and they'll be tagged and available for download with the code, so it's better to square it away before tagging and releasing rather than having errata not included with the release.

### Node release

+ Update the npm package by running `npm version <update_type>` where <update_type> is based on the selection above: patch, minor, or major. This will: change the version in `package.json`, commit that (locally), and make a tag in the format `vx.y.z`. Read more about that [on npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages#updating-the-package).
+ Deploy npm package to the world; `npm publish`. (if you don't have [publish rights][uw-frame access on npm] contact authors)
+ Push git changes to the github via `git push origin master` and `git push origin <tag>`

### Java release

Now do release for Java.

```sh
cd uw-frame-java
mvn release:prepare
mvn release:perform
```

_Iff it went well_

```sh
git push origin master
git push origin uw-frame-maven-<version>
```

+ Release maven artifacts from [central staging repository][central Maven staging repository]

### Docker release

Deploy a new version to `docker.doit.wisc.edu` (note the version below x.y.z should be the release version)

```
git checkout vx.y.z
docker build -t docker.doit.wisc.edu/myuw/uw-frame-superstatic:x.y.z .
docker push docker.doit.wisc.edu/myuw/uw-frame-superstatic:x.y.z
```

### Documentation release

You don't have to do anything special to release the documentation. GitHub pages will run Jekyll on the `docs` folder of the latest commit in the `master` branch, continually deploying the latest documentation to [the live documentation website](http://uw-madison-doit.github.io/uw-frame/).

### Release notes

* There should now be a couple tags above the `Latest release` on [the GitHub releases page][uw-frame releases]
* Click into the top one ( `uw-frame-maven-x.y.z`)
* Edit tag
* Title the release `x.y.z`, optionally `x.y.z - pithy summary`
* Add release notes, linking pull requests included in this release, linking the newly released documentation, and especially articulating anything interesting about the upgrade path to this release for frame-based app developers.

### Updating JIRA issues

In the `MUMUP` JIRA project, find the last unreleased patch version. If the
current release is a major or minor update, rename the version accordingly.
Apply that version as a `Fix Version` to the JIRA tickets resolved since the
last release. When all tickets have been added, `Release` the version and
create the next patch version.

### Communicating

* Announce the release on the [MyUW Developer Group][]


[Semantic Versioning]: http://semver.org/
[uw-frame closed pull requests]: https://github.com/UW-Madison-DoIT/uw-frame/pulls?q=is%3Apr+is%3Aclosed
[uw-frame milestones]: https://github.com/UW-Madison-DoIT/uw-frame/milestones
[uw-frame access on npm]: https://www.npmjs.com/package/uw-frame/access
[central Maven staging repository]: https://oss.sonatype.org/#stagingRepositories
[uw-frame releases]: https://github.com/UW-Madison-DoIT/uw-frame/releases
[MyUW Developer Group]: https://groups.google.com/forum/#!forum/myuw-developers
[adopted Apache rules]: https://github.com/UW-Madison-DoIT/uw-frame/blob/master/committers.md#rules
[Apache Release Policy re Release Approval]: http://www.apache.org/legal/release-policy.html#release-approval
[the uPortal-app-framework Committers]: https://github.com/UW-Madison-DoIT/uw-frame/blob/master/committers.md#who-are-the-committers
[uportal-dev@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-dev
