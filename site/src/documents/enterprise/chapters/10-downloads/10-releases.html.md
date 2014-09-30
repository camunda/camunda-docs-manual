---

category: 'Downloads'
title: 'Community vs. Enterprise Releases'

---


There is both a community and an enterprise edition of camunda BPM. Among these, we distinguish between four different types of releases:

1. __Major Release__: The Major release contains features and bugfixes. It is fully tested and meant to be used for production systems. The Major release may contain incompatible API changes. The release is done in parallel for the community edition and for the enterprise edition.
2. __Minor Release__: The Minor release contains features and bugfixes. It is fully tested and meant to be used for production systems. In Minor releases we add functionality in a backwards compatible manner. The release is done in parallel for the community edition and for the enterprise edition.
3. __Development Release__: On the community branch and on the enterprise branch we release _ALPHA_ versions in short iteration cycles. Development releases contain the latest features and bug fixes. The Development release is not fully tested and is a snapshot of the current development state.
4. __Maintenance Release__: On the enterprise branch we perform Maintenance releases in which we backport the latest bug fixes. Maintenance releases do not contain new features and are meant to be used for production systems. Maintenance releases are fully tested and are only available to enterprise customers.

The following drawing illustrates the different release types for the community edition and the enterprise edition.

<img class="img-responsive" src="ref:asset:/assets/img/releases.png"/>

Find more information about our versioning semantic [here](http://semver.org/).
