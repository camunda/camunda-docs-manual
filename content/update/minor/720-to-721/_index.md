---

title: "Update from 7.20 to 7.21"
weight: 3
layout: "single"

menu:
  main:
    name: "7.20 to 7.21"
    identifier: "migration-guide-721"
    parent: "migration-guide-minor"
    pre: "Update from `7.20.x` to `7.21.0`."

---

This document guides you through the update from Camunda Platform `7.20.x` to `7.21.0` and covers the following use cases:

1. For Developers: [Add Default History Time To Live to BPMN Fluent API](#add-default-history-time-to-live-to-bpmn-fluent-api)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda Platform 7.21.

# Add Default History Time To Live to BPMN Fluent API

Starting with this release, the [BPMN Fluent API Builder]({{< ref "/user-guide/model-api/bpmn-model-api/fluent-builder-api" >}}) assigns by default a history time to live of **6 months** to processes. You can change this default or pass `null` to remove the attribute using the `#setCamundaHistoryTimeToLive` or `#setCamundaHistoryTimeToLiveString` API.