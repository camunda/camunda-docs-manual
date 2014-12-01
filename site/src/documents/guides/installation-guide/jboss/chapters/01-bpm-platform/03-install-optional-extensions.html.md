---

title: 'Install Optional Camunda Dependencies'
shortTitle: 'Install Optional Dependencies'
category: 'BPM Platform'

---

This section describes how to install optional Camunda dependencies onto a JBoss server. None of these are required to work with the core platform. Before continuing, make sure that the Camunda BPM platform is already installed according to [this step](ref:#bpm-platform-install-the-platform-on-a-vanilla-jboss).

<div class="alert alert-info">
  <p><strong>Note</strong> </p>
  <p>When using a pre-packaged JBoss distribution, the optional extensions are already installed and activated.</p>
</div>

The following covers the installation of these extensions:

* [Camunda Connect](ref:/guides/user-guide/#process-engine-connectors)
* [Camunda Spin](ref:/guides/user-guide/#data-formats-xml-json-other)
* [Freemarker Integration](ref:/guides/user-guide/#process-engine-templating-installing-a-template-engine)
* [Groovy Scripting](ref:/guides/user-guide/#process-engine-scripting)

## Install Camunda Connect

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/connect/camunda-connect-core`
* `org/camunda/connect/camunda-connect-http-client`
* `org/camunda/connect/camunda-connect-soap-http-client`
* `org/camunda/bpm/camunda-engine-plugin-connect`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`
* `org/apache/httpcomponents/httpclient`
* `org/apache/httpcomponents/httpcore`
* `commons-codec/commons-codec`
* `commons-logging/commons-logging`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$JBOSS_HOME/standalone/configuration/standalone.xml` as follows:

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  ...
  <process-engines>
    <process-engine name="default" default="true">
      ...
      <plugins>
        ... existing plugins ...
        <plugin>
          <class>org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin</class>
        </plugin>
      </plugins>
      ...
    </process-engine>
  </process-engines>
  ...
</subsystem>
```

## Install Camunda Spin

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`
* `com/fasterxml/jackson/core/jackson-core`
* `com/fasterxml/jackson/core/jackson-databind`
* `com/fasterxml/jackson/core/jackson-annotations`
* `com/jayway/jsonpath/json-path`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in `$JBOSS_HOME/standalone/configuration/standalone.xml` as follows:

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  ...
  <process-engines>
    <process-engine name="default" default="true">
      ...
      <plugins>
        ... existing plugins ...
        <plugin>
          <class>org.camunda.spin.plugin.impl.SpinProcessEnginePlugin</class>
        </plugin>
      </plugins>
      ...
    </process-engine>
  </process-engines>
  ...
</subsystem>
```

## Install Groovy Scripting

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/codehaus/groovy/groovy-all`

## Install Freemarker Integration

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/template-engines/camunda-template-engines-freemarker`
* `org/freemarker/freemarker`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`