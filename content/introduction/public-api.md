---

title: 'Public API'
weight: 80

menu:
  main:
    identifier: "user-guide-introduction-public-api"
    parent: "user-guide-introduction"

---


The Camunda platform provides a public API. This section covers the definition of the public API and backwards compatibility for version updates.


# Definition of Public API

The Camunda BPM public API is limited to the following items:

Java API: 

All non-implementation Java packages (package name does not contain `impl`) of the following modules.

* `camunda-engine`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-engine-dmn`
* `camunda-bpmn-model`
* `camunda-cmmn-model`
* `camunda-dmn-model`
* `camunda-spin-core`
* `camunda-connect-core`
* `camunda-commons-typed-values`

HTTP API (REST API):

* `camunda-engine-rest`: HTTP interface (set of HTTP requests accepted by the REST API as documented in [REST API reference]({{< ref "/reference/rest/_index.md" >}}). Java classes are not part of the public API.


# Backwards Compatibility for Public API

The Camunda versioning scheme follows the MAJOR.MINOR.PATCH pattern put forward by [Semantic Versioning](http://semver.org/). Camunda will maintain public API backwards compatibility for MINOR version updates. Example: Update from version `7.1.x` to `7.2.x` will not break the public API.
