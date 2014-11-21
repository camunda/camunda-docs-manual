---

title: 'Install Optional Camunda Dependencies'
shortTitle: 'Install Optional Dependencies'
category: 'BPM Platform'

---

This section describes how to install optional camunda dependencies into a WebSphere server. None of these are required to work with the core platform.

The following covers the installation of these extensions:

* [Camunda Connect](ref:/guides/user-guide/#process-engine-connectors)
* [Camunda Spin](ref:/guides/user-guide/#data-formats-xml-json-other)
* [Freemarker Integration](ref:/guides/user-guide/#process-engine-templating-installing-a-template-engine)
* [Groovy Scripting](ref:/guides/user-guide/#process-engine-scripting)

## Install Camunda Connect

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib` to the `Camunda` shared library folder:

* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate camunda Connect functionality for a process engine, a process engine plugin has to be registered in the BPM platform configuration as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
  <process-engine name="default">
    ...
    <plugins>
      ... existing plugins ...
      <plugin>
        <class>org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>

</bpm-platform>
```

Note that this requires a custom `bpm-platform.xml` file.

## Install Camunda Spin

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate camunda Spin functionality for a process engine, a process engine plugin has to be registered in BPM platform configuration as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
  ...
  <process-engine name="default">
    ...
    <plugins>
      ... existing plugins ...
      <plugin>
        <class>org.camunda.spin.plugin.impl.SpinProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>
  ...
</bpm-platform>
```

Note that this requires a custom `bpm-platform.xml` file.

## Install Groovy Scripting

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `groovy-all-$GROOVY_VERSION.jar`

## Install Freemarker Integration

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`