---

title: 'Cockpit'
layout: "section-list"
weight: 120

menu:
  main:
    identifier: "user-guide-cockpit"
    parent: "webapps"
    pre: "Web application for monitoring and operations"

---


Camunda BPM Cockpit is a web application for monitoring and operations. It provides access to deployed BPMN processes and DMN decisions, allows searching though running and ended instances and performing operations on these.

{{< img src="img/dashboard.png" title="Cockpit Dashboard" >}}

The Cockpit architecture is extensible allowing it to be extended through [plugins][cockpit-plugins].

## Cockpit & History Levels

A big part of Cockpit's functionality relies on historical data, and some of this historical data is only provided through the `FULL` History Level.

Therefore, to gain the full feature set of Cockpit, and not suffer any UX degradation due to unavailable data, [History Level][history-levels] `FULL` should be set.

[cockpit-plugins]: {{< relref "webapps/cockpit/extend/plugins.md" >}}
[history-levels]: {{< relref "user-guide/process-engine/history.md#choose-a-history-level" >}}
