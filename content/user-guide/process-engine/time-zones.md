---

title: 'Time zones'
weight: 255

menu:
  main:
    identifier: "time-zones"
    parent: "user-guide-process-engine"

---

## Process engine

The Camunda engine uses the default time zone of the JVM when operating with dates:

* When reading datetime values from BPMN XML
* In REST responses
* When reading/writing DateTime values from/to the database

Database time zone and database sessions time zone are out of scope of the Camunda engine and must be configured explicitly.

## Camunda Web Applications

It is possible to use the Camunda Web Applications in different timezones. All dates are translated to/from the local timezone when working with the UI.

## Cluster Setup

In case the process engine is running in a [cluster]({{< ref "/introduction/architecture.md#clustering-model" >}}), 
all cluster nodes must run in one and the same time zone. In case cluster nodes exist in different time zones, 
correct behaviour when operating with DateTime values can not be guaranteed.