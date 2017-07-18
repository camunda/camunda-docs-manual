---

title: 'Time zones'
weight: 255

menu:
  main:
    identifier: "time-zones"
    parent: "user-guide-process-engine"

---

## Process engine

Camunda Engine uses JVM default time zone when operating with dates:

* when reading datetime values from BPMN XML
* in REST responses
* when reading/writing datetime values from/to database

Database time zone and database sessions time zone are out of scope of Camunda Engine and must be configured explicitly.

## Camunda Web Applications

It is possible to use Camunda Web Applications being in different timezones. All dates are being translated to/from the local timezone when working with UI.

## Cluster Setup

In case the process engine is running in [cluster]({{< relref "introduction/architecture.md#clustering-model" >}}), 
all cluster nodes must run in one and the same time zone. In the case when cluster nodes exist in different time zones, 
correct behaviour when operating with datetime values can not be guaranteed.