---

title: 'Install Optional Camunda Dependencies'
shortTitle: 'Install Optional Dependencies'
category: 'BPM Platform'

---

This section describes how to install optional camunda dependencies into a Glassfish server. None of these are required to work with the core platform. Before continuing, make sure that the camunda BPM platform is already installed according to [this step](ref:#bpm-platform-install-the-platform-on-a-vanilla-glassfish).

<div class="alert alert-info">
  <p><strong>Note</strong> </p>
  <p>When using a pre-packaged Glassfish distribution, the optional extensions are already installed and activated.</p>
</div>

The following covers the installation of these extensions:

* [Camunda Connect](ref:/guides/user-guide/#process-engine-connectors)
* [Camunda Spin](ref:/guides/user-guide/#data-formats-xml-json-other)
* [Freemarker Integration](ref:/guides/user-guide/#process-engine-templating-installing-a-template-engine)
* [Groovy Scripting](ref:/guides/user-guide/#process-engine-scripting)

## Install Camunda Connect

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

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

## Install Camunda Spin

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

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

## Install Groovy Scripting

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `groovy-all-$GROOVY_VERSION.jar`

## Install Freemarker Integration

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`