---

title: 'Telemetry'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-telemetry"
    parent: "user-guide-introduction"

---


At Camunda, we strive to offer excellent user experience at a high and stable level. On a strict opt-in basis, we are looking to collect environment and usage data to further improve the user experience for you. These insights help us to understand typical environment setups and product usage patterns and will be used data informed product improvement decisions to your benefit.

The Telemetry Reporter is disabled by default and only collects and sends data after you explicitly enable a [process engine configuration][engine-config] flag. The configuration can be changed at any time during runtime via Java API or [REST API][telemetry-config-rest].

The collected data will be sent once in 24 hours via HTTPS, which is scheduled by a Java timer task. We took good care that your process automation will not be negatively affected in case the Telemetry Reporter suddenly faces an unexpected error. Furthermore, no data will be collected and sent when you stop the process engine.

## Collected Data

Below you find the full list of data we want to collect, followed by a real-world example. On a conceptual level, they can be categorized into general data, meta/environment data, and usage data.
### General Data

The "General Data" category contains information about the process engine:

* Installation - an id that is stored as process engine configuration property
* Product name - the name of the product (i.e., `Camunda BPM Runtime`)
* Product version - the version of the process engine (i.e., `7.X.Y`)
* Product edition - the edition of the product (i.e., either `community` or `enterprise`)

### Meta/Environment Data
The "Meta/Environment Data" category contains information about the environmental setup:

* Database vendor and version
* Application server vendor and version

### Usage Data
The "Usage Data" category contains information about the used features and components of the process engine:

* Commands count - the count of executed commands after the last retrieved data. It could be from the previous 24 hours if the data have been reported then, and the process engine has not been closed during that time. Whenever the process engine is shutdown, the currently collected data is reported immediately.
* Metrics count - the collected metrics are number of root process instance executions started, number of activity instances started or also known as flow node instances, number of executed decision instances, and unique task workers. The counts are collected from the start of the engine or the last reported time if the engine is already running for more than 24 hours.

### Example

```
{
    "installation": "8343cc7a-8ad1-42d4-97d2-43452c0bdfa3",
    "product": {
      "name": "Camunda BPM Runtime",
      "version": "7.13.0",
      "edition": "community",
      "internals": {
        "database": {  
          "vendor": "h2",
          "version": "1.4.190 (2015-10-11)"
        },
        "application-server": {
          "vendor": "Wildfly",
          "version": "WildFly Full 19.0.0.Final (WildFly Core 11.0.0.Final) - 2.0.30.Final"
        },
        "commands": {
          "StartProcessInstanceCmd": {"count": 40},
          "FetchExternalTasksCmd":  {"count": 100}
        },
        "metrics": {
          "root-process-instances": { "count": 936 },
          "flow-node-instances": { "count": 6125 },
          "executed-decision-instances": { "count": 732 },
          "unique-task-workers": { "count": 50 }
        }
      }
    }
}
```

### Logger

A telemetry logger exists to log details about the sent information and error details in case the data couldn't be collected or sent. For further information check the [Logging]({{< ref "/user-guide/logging.md" >}}) page in the User Guide.

### Limitations in Collected Information

In certain scenarios, some of the information will not be retrieved due to the limitations of the implementation.

The application server information cannot be obtained in an embedded process engine setup where no web application (e.g. Tasklist, Cockpit, REST application) is deployed and used.


## How to enable telemetry

### Process Engine Configuration

Use the `initializeTelemetry` configuration [flag][engine-config] to enable the telemetry before starting the process engine. You can simply add it to your process engine configuration:

```
  <property name="initializeTelemetry">true</property>
```

Later on, the telemetry can be enabled/disabled via the engine API.

### Java/Rest API

You can change the telemetry configuration via our API.

To enable/disable telemetry via Java API:

```java
  managementService.toggleTelemetry(true);
```

To achieve the same, you can also use the respective REST API request. For more information, have a look at the [telemetry][telemetry-config-rest] page in the REST API documentation.

## Legal Note

Before you install a Camunda BPM Runtime version >= 7.14.0-alpha1 or activate the telemetry functionality, please make sure that you are authorized to take this step, and that the installation or activation of the [telemetry functionality][engine-config] is not in conflict with any company-internal policies, compliance guidelines, any contractual or other provisions or obligations of your company.

Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.

## Implementation 

In case you want further details, you can have a look at the implementation of the telemetry topic in [our codebase](https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/main/java/org/camunda/bpm/engine/impl/telemetry/reporter/TelemetrySendingTask.java). The link leads you to the current `master` version of the feature. In case you would like to check the implementation of an old version, adjust the `master` branch to a released tag version, e.g. `7.14.0`.

[engine-config]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#initializeTelemetry" >}}
[telemetry-config-rest]: {{< ref "/reference/rest/telemetry/port-telemetry.md" >}}
