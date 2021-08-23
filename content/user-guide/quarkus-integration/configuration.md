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

* The job executor is activated by default, i.e. the `jobExecutorActivate` property is set to `true`.
* Transactions are externally managed by default since the `transactionsExternallyManaged` is set to `true`.
* The `databaseSchemaUpdate` property is set to `true`. The [Database Configuration][db-schema-update] section goes into 
  more details on this propery and the resulting behavior.
* No JDBC configuration is present since a Quarkus datasource should be configured and used. As a result, the following
  properties are set to `null`:
  * `jdbcUrl`
  * `jdbcUsername`
  * `jdbcPassword`
  * `jdbcDriver`
* The `idGenerator` is set to an instance of {{< javadocref page="?org/camunda/bpm/engine/impl/persistence/StrongUuidGenerator.html" text="StrongUuidGenerator" >}}.

Quarkus allows to configure a Quarkus application via a [MicroProfile Config][mp-config] source. You can read more about 
configuring a Quarkus application in the [Quarkus configuration][quarkus-config] page. The Camunda Quarkus extension 
docs use the `application.properties` format in the examples, but you can use any supported Quarkus config source.

You can set any process engine configuration properties under the `quarkus.camunda` prefix. The 
[Process Engine Configuration Properties][engine-properties] page documents all the available properties. Please 
convert any property names from `camelCase` to the `kebab-case` format, like in the following example:

```properties
quarkus.camunda.cmmn-enabled=false
quarkus.camunda.dmn-enabled=false
quarkus.camunda.history=none
quarkus.camunda.initialize-telemetry=false
```

### Programmatic Process Engine Configuration

You can also configure the process engine programmatically, by providing a `QuarkusProcessEngineConfiguration` CDI bean.

```java
  @ApplicationScoped
  static class MyConfig {

    @Produces
    public QuarkusProcessEngineConfiguration customEngineConfig() {

      QuarkusProcessEngineConfiguration engineConfig = new QuarkusProcessEngineConfiguration();
      
      // your custom configuration is done here
      engineConfig.setProcessEngineName("customEngine");

      return engineConfig;
    }

  }
```

Note that values of properties set in a `QuarkusProcessEngineConfiguration` instance have a lower ordinal than
properties defined in a Quarkus config source. 

In the above example, a `QuarkusProcessEngineConfiguration` CDI bean defines "customEngine" as the `processEngineName`. 
However, if you define the following in an `application.properties` file

```properties
quarkus.camunda.process-engine-name=quarkusEngine
```

then "quarkusEngine" will be used as the process engine name since Quarkus config sources have a higher ordinal than a 
`QuarkusProcessEngineConfiguration` CDI bean.

## Job Executor Configuration

As with the process engine configuration properties [above](#process-engine-configuration), you can set any job executor 
configuration properties under the `quarkus.camunda.job-executor` prefix. The [Job Executor Configuration Properties][executor-properties] 
page documents all the available properties. Convert any property names you intend to use from `camelCase` to the 
`kebab-case` format, like in the following example:

```properties
quarkus.camunda.job-executor.max-jobs-per-acquisition=5
quarkus.camunda.job-executor.lock-time-in-millis=500000
quarkus.camunda.job-executor.wait-time-in-millis=7000
quarkus.camunda.job-executor.max-wait=65000
```

## Quarkus Extension Configuration

In addition to the general process engine, and job executor, configuration properties mentioned in the previous 
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
      For configuring a Quarkus Datasource, have a look on the [Quarkus Datasource][quarkus-datasource] page.
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

## Datasource

If not default Quarkus datasource is configured, the Camunda Quarkus extension sets an embedded (local) H2 database as 
the primary/default Quarkus datasource.

### Using Quarkus Transaction Integration with CockroachDB

Quarkus allows its users to control transaction boundaries. This is documented in their [Quarkus Transactions][quarkus-transactions] 
page. In case you use the Quarkus Transactions Integration with CockroachDB, please see the documentation section on 
[external transaction management with CockroachDB][crdb-transactions] to understand how to configure the Camunda process
engine correctly.

## Example

The following is an example of a Quarkus `application.properties` file that provides custom values for the process 
engine configuration, job executor and data source:

```properties
# process engine configuration
quarkus.camunda.cmmn-enabled=false
quarkus.camunda.dmn-enabled=false
quarkus.camunda.history=none
quarkus.camunda.initialize-telemetry=false

# job executor configuration
quarkus.camunda.job-executor.thread-pool.max-pool-size=12
quarkus.camunda.job-executor.thread-pool.queue-size=5
quarkus.camunda.job-executor.max-jobs-per-acquisition=5
quarkus.camunda.job-executor.lock-time-in-millis=500000
quarkus.camunda.job-executor.wait-time-in-millis=7000
quarkus.camunda.job-executor.max-wait=65000
quarkus.camunda.job-executor.backoff-time-in-millis=5

# custom data source configuration and selection
quarkus.datasource.camunda.db-kind=h2
quarkus.datasource.camunda.username=camunda
quarkus.datasource.camunda.password=camunda
quarkus.datasource.camunda.jdbc.url=jdbc:h2:mem:camunda;MVCC=TRUE;TRACE_LEVEL_FILE=0;DB_CLOSE_ON_EXIT=FALSE
quarkus.camunda.datasource=camunda
```

[crdb-transactions]: {{< ref "/user-guide/process-engine/database/cockroachdb-configuration.md#using-external-transaction-management-with-the-spring-java-ee-integrations" >}}
[engine-properties]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#configuration-properties" >}}
[executor-properties]: {{< ref "/reference/deployment-descriptors/tags/job-executor.md#job-acquisition-configuration-properties" >}}
[db-schema-update]: {{< ref "/user-guide/process-engine/database/database-configuration.md#example-database-configuration" >}}

[quarkus-datasource]: https://quarkus.io/guides/datasource
[quarkus-transactions]: https://quarkus.io/guides/transaction#declarative-approach
[quarkus-cdi]: https://quarkus.io/guides/cdi-reference
[quarkus-config]: https://quarkus.io/guides/config-reference
[mp-config]: https://www.eclipse.org/community/eclipse_newsletter/2017/september/article3.php