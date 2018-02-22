---

title: "Update from 7.8 to 7.9"
weight: 50
menu:
  main:
    name: "7.8 to 7.9"
    identifier: "migration-guide-78"
    parent: "migration-guide-minor"
    pre: "Update from `7.8.x` to `7.9.0`."

---

<!-- TODO :  -->

# Base Delegate Execution

This section concerns the Java API and the interface `org.camunda.bpm.engine.delegate.BaseDelegateExecution`.

The behaviour of `BaseDelegateExecution#getBusinessKey` has been changed. It now returns a business key of the root execution, e.g. process instance and is equivalent to `DelegateExecution#getProcessBusinessKey`.

Please note this change can influence your custom implementations of `Execution Listener`.

# Java serialized objects

Starting from version 7.9 setting object variables, serialized with Java serialization, is forbidden by default. You can be affected by this change, if you are using such kind of REST requests:

```json
PUT /process-instance/{id}/variables/{varName}

{
  "value" : "ab",
  "type" : "Object",
  "valueInfo" : {
    "objectTypeName": "com.example.MyObject",
    "serializationDataFormat": "application/x-java-serialized-object"
  }
}
``` 

or via Java:

```java
runtimeService.setVariable(processInstanceId, "varName",
        Variables
          .serializedObjectValue("ab")
          .serializationDataFormat("application/x-java-serialized-object")
          .objectTypeName("com.example.MyObject")
          .create());
```
In this case you will need to use another serialization format (JSON or XML) or to explicitly enable Java serialization with the help of [this configuration parameter]({{< relref "reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}):

```xml
<property name="javaSerializationFormatEnabled">true</property>
```

# Groovy version

The pre-built Camunda distributions of versions 7.6.10, 7.7.5 and 7.8.0 ship with Groovy library of version 2.4.5, whereas newer versions come with Groovy 2.4.13. 
Please update the library `groovy-all-$GROOVY_VERSION.jar` in the `lib` folder of your application server.


# Adjustable Time Period for Historic Activity Instances   

In the historic process definition diagram it is possible to select time periods for which activity instance badges are displayed.

By default the displayed timer period is set to 'today' but can be extended to show badges of 'this week', 'this month' or the 'complete' history.

This feature can be configured in two ways:

1. The default timer period can be changed to 'this week', 'this month' or 'complete'
2. The manual selection of the time period within Cockpit can be disabled.

These attributes can be modifed in the [configuration file]({{< relref "webapps/cockpit/extend/configuration.md#historic-activity-instance-metrics" >}})


# Throttle login attempts

We introduce a special mechanism for consecutive unsuccessful login attempts.
A user will be delayed in trying to login after an unsuccessful login attempt for a certain amount of time (in seconds). This delay is calculated through a formula, and the contributing values are configurable. Please read more in the [Identity service]({{< relref "user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}) section.

The default values are:
```java
loginMaxAttempts = 5;
loginDelayFactor = 2;
loginDelayMaxTime = 60;
loginDelayBase = 2;
```

# Jackson version update

Jackson version in Spin project was updated from version 2.6.3 to 2.9.3, but Spin is still compatible with older version (2.6.3). To switch back on older version you can just replace `jackson-*-2.9.3.jar` 
libraries by `jackson-*-2.6.3.jar` in your application server folder. Or, in case you're using Camunda as a part of your Maven application, configure appropriate dependencies in your `pom.xml`:

```xml
  <dependency>
      <groupId>org.camunda.spin</groupId>
      <artifactId>camunda-spin-core</artifactId>
      <!-- exclude 2.9.3 dependencies -->
      <exclusions>
        <exclusion>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-core</artifactId>
        </exclusion>
        <exclusion>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-databind</artifactId>
        </exclusion>
      </exclusions>
    </dependency>

    <!-- include 2.6.3 dependencies -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-core</artifactId>
      <version>2.6.3</version>
    </dependency>

    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.6.3</version>
    </dependency>
``` 

You may consider downgrading back to older version of Jackson in case you use Spin project for JSON variables and serialization and:

1. You run your application on Java 6 (Jackson is not compatible with Java 6 anymore).
2. You use older Jackson version in other parts of your application and have some reasons to stick to this version so far.