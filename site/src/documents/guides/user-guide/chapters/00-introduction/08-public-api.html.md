---

title: 'Public API'
category: 'Introduction'

---

The camunda platform provides a public API. This section covers the definition of the public API and backwards compatibility for version updates.

## Definition of Public API

camunda BPM public API is limited to the following items:

Java API:

- `camunda-engine`: all non implementation Java packages (package name does not contain `impl`)
- `camunda-engine-spring`: all non implementation Java packages (package name does not contain `impl`)
- `camunda-engine-cdi`: all non implementation Java packages (package name does not contain `impl`)

HTTP API (REST API):

- `camunda-engine-rest`: HTTP interface (set of HTTP requests accepted by the REST API as documented in [REST API reference](ref:/api-references/rest/)). Java classes are not part of the public API.


## Backwards Compatibility for Public API

The camunda versioning scheme follows the MAJOR.MINOR.PATCH pattern put forward by [Semantic Versioning](http://semver.org/). camunda will maintain public API backwards compatibility
for MINOR version updates. Example: Update from version 7.1.x to 7.2.x will not break the public API.
