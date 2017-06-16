---

title: "Update from 7.7 to 7.8"
weight: 55

menu:
  main:
    name: "7.7 to 7.8"
    identifier: "migration-guide-77"
    parent: "migration-guide-minor"
    pre: "Update from `7.7.x` to `7.8.0`."

---

This document guides you through the update from Camunda BPM `7.7.x` to `7.8.0`. It covers these use cases:

# REST API date format

This section is applicable if you use Camunda engine REST API.

Default date format used in REST API requests and responses has changed from `yyyy-MM-dd'T'HH:mm:ss` to `yyyy-MM-dd'T'HH:mm:ss.SSSZ` (includes second fractions and timezone now). 
Camunda Web Applications support the new format by default.

In case some custom REST clients rely on old date format, choose one of two options:

1. Update REST clients to use the new format.
2. Configure custom date format for Camunda REST API (explained in details in [Custom Date Format]({{< relref "reference/rest/overview/date-format.md" >}})).
