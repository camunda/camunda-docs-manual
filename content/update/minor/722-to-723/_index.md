---

title: "Update from 7.22 to 7.23"
weight: 1
layout: "single"

menu:
  main:
    name: "7.22 to 7.23"
    identifier: "migration-guide-723"
    parent: "migration-guide-minor"
    pre: "Update from `7.22.x` to `7.23.0`."

---

This document guides you through the update from Camunda `7.22.x` to `7.23.0` and covers the following use cases:

1. For developers: [Set Variables Async API](#Set Variables Async API)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.23.

# Set Variables Async API

Before version 7.22.1, the Set Variables Async API failed whenever at least one of the process instances did not exist. 

Starting with version 7.22.1, the behavior has changed: if any of the process instances was deleted or completed, the call will still succeed. As a consequence, the Set Variables Batch Operation will also succeed in this case.

Please note that this does not apply to the Sync API, which keeps its behavior and fails if the process instance does not exist.