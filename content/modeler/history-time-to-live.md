---

title: 'History time to live'
weight: 30

menu:
  main:
    identifier: "history-time-to-live"
    parent: "modeler"

---

Each execution of a model resource (BPMN, DMN, and CMMN) generates historic data during execution that is stored in the database. In Camunda 7, [history cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/) removes this historic data from the database based on a defined **history time to live (HTTL)**.

From [Camunda 7.20](https://docs.camunda.org/manual/develop/update/minor/719-to-720/#enforce-history-time-to-live) onwards, you must configure HTTL in one of the following ways:

- Define HTTL per model directly in Desktop Modeler.
- Set a default HTTL via an engine configuration.
- Switch off the HTTL check via an engine configuration if history cleanup is not used.

## Values

Process instances are only cleaned up if their corresponding definition has a valid time to live (TTL). Use the `historyTimeToLive` extension attribute of the process definition to define the TTL for all its instances:

`<process id="oneTaskProcess" name="The One Task Process" isExecutable="true" camunda:historyTimeToLive="5"></process>`

TTL can also be defined in ISO-8601 date format. The function only accepts the notation to define the number of days.

`<process id="oneTaskProcess" name="The One Task Process" isExecutable="true" camunda:historyTimeToLive="P5D"></process>`

Refer to the [Camunda 7 documentation regarding case definitions](https://docs.camunda.org/manual/7.22/user-guide/process-engine/history/history-cleanup/#process-decision-case-definitions) for additional details.

Time to live must be defined under **History cleanup** in the properties panel on the right side of the screen.

## References

- [History documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/)
- [Camunda 7.20 migration](https://docs.camunda.org/manual/develop/update/minor/719-to-720/#enforce-history-time-to-live)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-platform/history-time-to-live.js)