---

title: 'Usage with a pre-built distribution'
category: 'Overview'

---


The REST API is included in camunda's pre-built distributions.
It may be accessed via the context `/engine-rest` and uses the engines provided by the class `BpmPlatform`.

The default process engine is available out of the box by accessing `/engine-rest/engine/default/{rest-methods}`
or simply `/engine-rest/{rest-methods}`. Any other shared process engine, i.e. it is globally visible, that is created later is available through `/engine-rest/engine/{name}/{rest-methods}` without any further configuration.

Authentication is deactivated by default, but can be activated as described in the [authentication section](ref:#overview-configuring-authentication).