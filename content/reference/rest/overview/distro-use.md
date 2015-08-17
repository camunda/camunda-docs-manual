---

title: "Usage with a pre-built Distribution"
weight: 20

menu:
  main:
    identifier: "rest-api-overview-distro-use"
    parent: "rest-api-overview"

---


The REST API is included in Camunda's pre-built distributions.
It may be accessed via the context `/engine-rest` and uses the engines provided by the class `BpmPlatform`.

The default process engine is available out of the box by accessing `/engine-rest/engine/default/{rest-methods}`
or simply `/engine-rest/{rest-methods}`. Any other shared (i.e., it is globally visible) process engine that is created later is available through `/engine-rest/engine/{name}/{rest-methods}` without any further configuration.

Authentication is deactivated by default, but can be activated as described in the [Authentication]({{< relref "reference/rest/overview/authentication.md" >}}) section.
