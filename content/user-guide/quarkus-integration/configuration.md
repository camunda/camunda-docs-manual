---

title: "Quarkus Extension Configuration"
weight: 20

menu:
  main:
    name: "Configuration"
    identifier: "user-guide-quarkus-configuration"
    parent: "user-guide-quarkus-integration"

---

This section of the Camunda Quarkus extension documentation covers the configuration options for the process engine
within a Quarkus application.

The documentation on the Camunda Quarkus Extension Configuration is intended for Quarkus application developers. It 
requires some knowledge on [Quarkus CDI support][quarkus-cdi], [Quarkus configuration][quarkus-config], as well as
Camunda Process Engine Configuration properties.

## Process Engine Configuration

An instance of the `QuarkusProcessEngineConfiguration` class configures the process engine in a Quarkus application. 
A `QuarkusProcessEngineConfiguration` instance provides the following defaults:

<table class="table desc-table">
  <tr>
    <th>Property name</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>

  <tr>
    <td><code>jobExecutorActivate</code></td>
    <td>
      The job executor is activated.
    </td>
    <td><code>true</code></td>
  </tr>

  <tr>
    <td><code>transactionsExternallyManaged</code></td>
    <td>
      Transactions are externally managed.
    </td>
    <td><code>true</code></td>
  </tr>

  <tr>
    <td><code>databaseSchemaUpdate</code></td>
    <td>
      The <a href="{{< ref "/user-guide/process-engine/database/database-configuration.md#example-database-configuration" >}}">Database Configuration</a> 
      section goes into more details on this propery and the resulting behavior.
    </td>
    <td><code>true</code></td>
  </tr>

  <tr>
    <td><code>idGenerator</code></td>
    <td>
      An instance of {{< javadocref page="org/camunda/bpm/engine/impl/persistence/StrongUuidGenerator.html" text="StrongUuidGenerator" >}}
      is used.
    </td>
    <td><code>StrongUuidGenerator</code></td>
  </tr>

  <tr>
    <td>
      <code>jdbcUrl</code>,<br> 
      <code>jdbcUsername</code>,<br>
      <code>jdbcPassword</code>,<br>
      <code>jdbcDriver</code>
    </td>
    <td>
      No JDBC configuration is present since a Quarkus datasource should be configured and used.
    </td>
    <td><code>null</code></td>
  </tr>

  <tr>
    <td>
      <code>history</code>
    </td>
    <td>
      Camunda Cockpit works best with history level 
      <a href="{{< ref "/user-guide/process-engine/history/history-configuration.md#choose-a-history-level">}}">FULL</a>.
    </td>
    <td><code>full</code></td>
  </tr>

</table>

Quarkus allows to configure a Quarkus application via a [MicroProfile Config][mp-config] source. You can read more about 
configuring a Quarkus application in the [Quarkus configuration][quarkus-config] page. The Camunda Quarkus extension 
docs use the `application.properties` format in the examples, but you can use any supported Quarkus config source.

You can set any process engine configuration properties under the `quarkus.camunda` prefix. The 
[Process Engine Configuration Properties][engine-properties] page documents all the available properties. Please 
convert any property names from `camelCase` to the `kebab-case` format, like in the following example:

```properties
quarkus.camunda.generic-config.cmmn-enabled=false
quarkus.camunda.generic-config.dmn-enabled=false
quarkus.camunda.generic-config.history=none
```

### Programmatic Configuration

You can also configure the process engine programmatically, by providing a `QuarkusProcessEngineConfiguration` CDI bean.

```java
@ApplicationScoped
public class MyCustomEngineConfig extends QuarkusProcessEngineConfiguration {
  public MyCustomEngineConfig() {
    // your custom configuration is done here
    setProcessEngineName("customEngine");
  }
}
```

Note that values of properties set in a `QuarkusProcessEngineConfiguration` instance have a lower ordinal than
properties defined in a Quarkus config source. 

In the above example, a `QuarkusProcessEngineConfiguration` CDI bean defines "customEngine" as the `processEngineName`. 
However, if you define the following in an `application.properties` file

```properties
quarkus.camunda.generic-config.process-engine-name=quarkusEngine
```

then "quarkusEngine" will be used as the process engine name since Quarkus config sources have a higher ordinal than a 
`QuarkusProcessEngineConfiguration` CDI bean.

## Job Executor Configuration

As with the process engine configuration properties [above](#process-engine-configuration), you can set any job executor 
configuration properties under the `quarkus.camunda.job-executor` prefix. The [Job Executor Configuration Properties][executor-properties] 
page documents all the available properties. Convert any property names you intend to use from `camelCase` to the 
`kebab-case` format, like in the following example:

```properties
quarkus.camunda.job-executor.generic-config.max-jobs-per-acquisition=5
quarkus.camunda.job-executor.generic-config.lock-time-in-millis=500000
quarkus.camunda.job-executor.generic-config.wait-time-in-millis=7000
quarkus.camunda.job-executor.generic-config.max-wait=65000
```

## Quarkus Extension Configuration

In addition to the general process engine and job executor configuration properties mentioned in the previous 
sections, the Camunda Quarkus extension provides some Quarkus-specific configuration properties. They can be set
through a Quarkus config source, but not through the `QuarkusProcessEngineConfiguration` class. You can find all
the Quarkus-specific properties in the following table:

<table class="table desc-table">
  <tr>
    <th>Prefix</th>
    <th>Property name</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>

  <tr><td colspan="4"><b>Data Source</b></td></tr>
  
  <tr>
    <td rowspan="1"><code>quarkus.camunda</code></td>
    <td><code>.datasource</code></td>
    <td>
      Specifies which Quarkus datasource to use. If not defined, the primary Quarkus datasource will be used. 
      For configuring a Quarkus Datasource, have a look on the 
      <a href="https://quarkus.io/guides/datasource">Quarkus Datasource</a> page.
    </td>
    <td><code>&#60;default&#62;</code></td>
  </tr>

  <tr><td colspan="4"><b>Job Executor</b></td></tr>

  <tr>
    <td rowspan="2"><code>quarkus.camunda.job-executor.thread-pool</code></td>
    <td><code>.max-pool-size</code></td>
    <td>Sets the maximum number of threads that can be present in the thread pool.</td>
    <td><code>10</code></td>
  </tr>

  <tr>
    <td><code>.queue-size</code></td>
    <td>Sets the size of the queue which is used for holding tasks to be executed.</td>
    <td><code>3</code></td>
  </tr>
</table>

## Persistence

The Engine Extension integrates with a JDBC Connection Pool and a Jakarta Transaction Manager provided 
by [Quarkus][quarkus-datasource]. The latter allows you to integrate your business logic into database 
transactions of the Engine. Read more about it under [JTA Transaction Integration][jta-transaction-integration]. 
A datasource is required to run the Camunda process engine.

### Choose from multiple datasources

When multiple datasources are available in your application, you can choose the one the Engine Extension
should use by its name via the `camunda.datasource` configuration property. Consider the example configuration below:

```properties
quarkus.datasource.engine-datasource.db-kind=oracle
quarkus.datasource.engine-datasource.username=my-username
quarkus.datasource.engine-datasource.password=my-password
quarkus.datasource.engine-datasource.jdbc.url=jdbc:oracle:thin:@localhost:1521:ORCL

quarkus.camunda.datasource=engine-datasource
```

## Example

The following is an example of a Quarkus `application.properties` file that provides custom values for the process 
engine configuration, job executor and data source:

```properties
# process engine configuration
quarkus.camunda.generic-config.cmmn-enabled=false
quarkus.camunda.generic-config.dmn-enabled=false
quarkus.camunda.generic-config.history=none

# job executor configuration
quarkus.camunda.job-executor.thread-pool.max-pool-size=12
quarkus.camunda.job-executor.thread-pool.queue-size=5
quarkus.camunda.job-executor.generic-config.max-jobs-per-acquisition=5
quarkus.camunda.job-executor.generic-config.lock-time-in-millis=500000
quarkus.camunda.job-executor.generic-config.wait-time-in-millis=7000
quarkus.camunda.job-executor.generic-config.max-wait=65000
quarkus.camunda.job-executor.generic-config.backoff-time-in-millis=5

# custom data source configuration and selection
quarkus.datasource.my-datasource.db-kind=h2
quarkus.datasource.my-datasource.username=camunda
quarkus.datasource.my-datasource.password=camunda
quarkus.datasource.my-datasource.jdbc.url=jdbc:h2:mem:camunda;TRACE_LEVEL_FILE=0;DB_CLOSE_ON_EXIT=FALSE
quarkus.camunda.datasource=my-datasource
```

[engine-properties]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#configuration-properties" >}}
[executor-properties]: {{< ref "/reference/deployment-descriptors/tags/job-executor.md#job-acquisition-configuration-properties" >}}

[quarkus-datasource]: https://quarkus.io/guides/datasource
[quarkus-transactions]: https://quarkus.io/guides/transaction#declarative-approach
[quarkus-cdi]: https://quarkus.io/guides/cdi-reference
[quarkus-config]: https://quarkus.io/guides/config-reference
[mp-config]: https://www.eclipse.org/community/eclipse_newsletter/2017/september/article3.php

[jta-transaction-integration]: {{< ref "/user-guide/cdi-java-ee-integration/jta-transaction-integration.md">}}
