---

title: 'Decisions in the Process Engine'
weight: 260
layout: "section-list"

menu:
  main:
    name: "Decisions"
    identifier: "user-guide-process-engine-decisions"
    parent: "user-guide-process-engine"

---

The Camunda BPM platform provides an integration of the [Camunda DMN engine] to
evaluate Business Decisions. This section describes how to deploy Business
Decisions modeled as [DMN decision tables] together with other resources to the
repository of the Camunda BPM Platform. Deployed decisions can be evaluate
using the [Services API]. Or they can be reference in BPMN processes and CMMN
cases. Evaluated decision are saved in the [History] of the platform.


[Camunda DMN engine]: {{< relref "user-guide/dmn-engine/index.md" >}}
[DMN decision tables]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[Services API]: {{< relref "user-guide/process-engine/process-engine-api.md#services-api" >}}
[History]: {{< relref "user-guide/process-engine/history.md" >}}
