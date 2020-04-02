# Contributing to `uportal-app-framework`

+ Be kind. (Uphold the [code of conduct][]).
+ Be an ICLA signatory. (Comply with [Apereo licensing policy][Apereo website on licensing]).
+ Try to compose commit messages implementing [Conventional Commits][].
+ Consider running `npm run lint-all` to catch earliest the issues that the
  continuous integration build is going to flag.

## Code of conduct

The [Apereo Welcoming Policy][] applies. Cf. [code of conduct][].

## Contributor License Agreements

As an [incubating, aspiring Apereo product][uportal-home website on incubating], `uportal-app-framework` requires contributors and contributions to comply with [Apereo inbound intellectual property licensing practices][].

The short version:

+ You must have submitted an [Apereo Individual Contributor License Agreement][]
+ You individually must actually appear in the [roster of registered ICLAs][Apereo CLA roster].
+ To the extent that you're working under the auspices of an employer or working on behalf of anyone or anything other than yourself individually, those entities must have submitted a [Apereo Corporate Contributor License Agreement][] naming you as an authorized contributor.
+ Those entities must actually appear in [the roster of registered CCLAs][Apereo CLA roster].

The long version:

+ [Apereo website on licensing][]
+ [Apereo website on Contributor License Agreement][]

*Please* provide feedback about how these practices impact your ability to contribute. You might voice that feedback on the [Apereo licensing discussion Google Group][] or in any other way in which you are comfortable.

## Conventional Commits

This project uses [Conventional Commits][].

Conventional Commits compliance is not a hard requirement to contribute. Do
what you can. If necessary commit message style can be further worked up at the
Pull Request / code review layer. Non-compliant commit messages will be flagged
by continuous integration (e.g. Travis-CI) on pull requests.

You can locally lint (check for style compliance) your most recent commit message by `npm run lint-commit`.

You can locally lint your commit messages via a pre-commit hook by running `npm run add-hooks`.

## Linting

The Travis-CI continual integration build continually lints the codebase.

You can run linting locally to discover earlier what Travis-CI might be
concerned about in your changes.

`npm run lint-all`

[uportal-home website on incubating]: http://uportal-project.github.io/uportal-home/apereo-incubation.html
[Apereo inbound intellectual property licensing practices]: https://www.apereo.org/licensing/practices
[Apereo Individual Contributor License Agreement]: https://www.apereo.org/sites/default/files/Licensing%20Agreements/apereo-icla.pdf
[Apereo Corporate Contributor License Agreement]: https://www.apereo.org/sites/default/files/Licensing%20Agreements/apereo-ccla.pdf
[Apereo website on licensing]: https://www.apereo.org/licensing
[Apereo website on Contributor License Agreement]: https://www.apereo.org/licensing/agreements
[Apereo licensing discussion Google Group]: https://groups.google.com/a/apereo.org/forum/#!forum/licensing-discuss
[Apereo CLA roster]: http://licensing.apereo.org/completed-clas
[Apereo Welcoming Policy]: https://www.apereo.org/content/apereo-welcoming-policy
[Conventional Commits]: https://conventionalcommits.org/
[code of conduct]: ../CODE_OF_CONDUCT.md
