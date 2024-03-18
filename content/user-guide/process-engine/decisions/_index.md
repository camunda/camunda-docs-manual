---

title: 'Decisions in the Process Engine'
weight: 260

menu:
  main:
    name: "Decisions"
    identifier: "user-guide-process-engine-decisions"
    parent: "user-guide-process-engine"

---

Camunda 7 provides an integration of the [Camunda DMN engine] to
evaluate Business Decisions. This section describes how to deploy Business
Decisions modeled as DMN decisions together with other resources to the
repository of Camunda 7. Deployed decisions can be evaluated
using the [Services API] or they can be referenced in BPMN processes and CMMN
cases. Evaluated decisions are saved in the [History] for auditing and reporting purposes.

[Camunda DMN engine]: {{< ref "/user-guide/dmn-engine/_index.md" >}}
[Services API]: {{< ref "/user-guide/process-engine/process-engine-api.md#services-api" >}}
[History]: {{< ref "/user-guide/process-engine/history/history-configuration.md" >}}
