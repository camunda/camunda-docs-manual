---

title: "Process Engine Configuration"
weight: 20

menu:
  main:
    name: "Configuration"
    identifier: "user-guide-spring-boot-configuration"
    parent: "user-guide-spring-boot-integration"

---

The auto starter uses the  `org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin` mechanism to configure the engine.

The configuration is divided into _sections_. These _sections_ are represented by the marker interfaces:

* `org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaDatasourceConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaHistoryConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaHistoryLevelAutoHandlingConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaJobConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaJpaConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaAuthorizationConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaFailedJobConfiguration`
* `org.camunda.bpm.spring.boot.starter.configuration.CamundaMetricsConfiguration`

## Default Configurations

The following default and best practice configurations are provided by the starter and can be customized or overridden.

### `DefaultProcessEngineConfiguration`

Sets the process engine name and automatically adds all `ProcessEnginePlugin` beans to the configuration.

### `DefaultDatasourceConfiguration`

Applies the datasource and transaction management configurations to the process engine.
If you want to [configure more than one datasource](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-two-datasources) and don't want to use the 
`@Primary` one for the process engine, then name the one you want to use as `camundaBpmDataSource`.

```java
@Bean
@Primary
@ConfigurationProperties(prefix="datasource.primary")
public DataSource primaryDataSource() {
  return DataSourceBuilder.create().build();
}

@Bean(name="camundaBpmDataSource")
@ConfigurationProperties(prefix="datasource.secondary")
public DataSource secondaryDataSource() {
  return DataSourceBuilder.create().build();
}
```

### `DefaultHistoryConfiguration`

Applies the history configuration to the process engine. If not configured, the history level [FULL]({{< relref "user-guide/process-engine/history.md#choose-a-history-level" >}}) is used.
If you want to use a custom `HistoryEventHandler`, you just have to provide a bean implementing the interface.

```java
@Bean
public HistoryEventHandler customHistoryEventHandler() {
  return new CustomHistoryEventHanlder();
}
```

### `DefaultHistoryLevelAutoHandlingConfiguration`
As camunda version >= 7.4 supports `history-level auto`, this configuration adds support for versions <= 7.3.

To have more control over the handling, you can provide your own

- `org.camunda.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminator` with name `historyLevelDeterminator`

IMPORTANT: The default configuration is applied after all other default configurations using the ordering mechanism.

### `DefaultJobConfiguration`

Applies the job execution properties to the process engine.

To have more control over the execution itself, you can provide your own

- `org.camunda.bpm.engine.impl.jobexecutor.JobExecutor`
- `org.springframework.core.task.TaskExecutor` named `camundaTaskExecutor`

beans.

IMPORTANT: The job executor is not enabled in the configuration.
This is done after the spring context successfully loaded (see `org.camunda.bpm.spring.boot.starter.runlistener`).

### `DefaultDeploymentConfiguration`

If auto deployment is enabled (this is the case by default), all processes found in the classpath are deployed.
The resource pattern can be changed using properties (see [properties](#camunda-engine-properties)).

### `DefaultJpaConfiguration`

If JPA is enabled and a `entityManagerFactory` bean is configured, the process engine is enabled to use JPA (see [properties](#camunda-engine-properties)).

### `DefaultAuthorizationConfiguration`

Applies the authorization configuration to the process engine. If not configured, the `camunda` default values are used (see [properties](#camunda-engine-properties)).

## Overriding the Default Configuration

Provide a bean implementing one of the marker interfaces. For example to customize the datasource configuration:

```java
@Configuration
public class MyCamundaConfiguration {

	@Bean
	public static CamundaDatasourceConfiguration camundaDatasourceConfiguration() {
		return new MyCamundaDatasourceConfiguration();
	}

}
```

## Adding Additional Configurations

You just have to provide one or more beans implementing the `org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin` interface 
(or extend from `org.camunda.bpm.spring.boot.starter.configuration.impl.AbstractCamundaConfiguration`). 
The configurations are applied ordered using the spring ordering mechanism (`@Order` annotation and `Ordered` interface). 
So if you want your configuration to be applied before the default configurations, add a `@Order(Ordering.DEFAULT_ORDER - 1)` annotation to your class. 
If you want your configuration to be applied after the default configurations, add a `@Order(Ordering.DEFAULT_ORDER + 1)` annotation to your class.

```java
@Configuration
public class MyCamundaConfiguration {

	@Bean
	@Order(Ordering.DEFAULT_ORDER + 1)
	public static ProcessEnginePlugin myCustomConfiguration() {
		return new MyCustomConfiguration();
	}

}
```

Or, if you have component scan enabled:

```java
@Component
@Order(Ordering.DEFAULT_ORDER + 1)
public class MyCustomConfiguration implements ProcessEnginePlugin {

	@Override
	public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
		//...
	}

	...

}
```

or

```java
@Component
@Order(Ordering.DEFAULT_ORDER + 1)
public class MyCustomConfiguration extends AbstractCamundaConfiguration {

	@Override
	public void preInit(SpringProcessEngineConfiguration springProcessEngineConfiguration) {
		//...
	}

	...

}
```

## Camunda Engine Properties

<table class="table desc-table">
<tr>
<th>Prefix</th>
 <th>Property name</th> 
 <th>Description</th>
  <th>Default value</th>
  </tr>
<tr><td colspan="4">*General*</td></tr>

<tr><td rowspan="11">`camunda.bpm`</td>
<td>`.enabled`</td>
<td>Switch to disable the Camunda auto-configuration. Use to exclude Camunda in integration tests.</td>
<td>`true`</td>
</tr>

<tr>
<td>`.process-engine-name`</td>
<td>Name of the process engine</td>
<td>Camunda default value</td>
</tr>
<tr>
<td>`.default-serialization-format`</td>
<td>Default serialization format</td>
<td>Camunda default value</td>
</tr>

<tr>
<td>`.history-level`</td>
<td>Camunda history level</td>
<td>FULL</td>
</tr>

<tr>
<td>`.history-level-default`</td>
<td>Camunda history level to use when `history-level` is `auto`, but the level can not determined automatically</td>
<td>FULL</td>
</tr>

<tr>
<td>`.auto-deployment-enabled`</td>
<td>If processes should be auto deployed. This is disabled when using the SpringBootProcessApplication</td>
<td>`true`</td>
</tr>

<tr>
<td><a name="license-file"></a>`.license-file`</td>
<td>Provides an URL to your Camunda license file and is automatically inserted into the DB when the application starts (but only if no license key is found in the DB).</td>
<td>By default, the license key will be loaded from the file with the name `camunda-license.txt` from classpath (if present).</td>
</tr>

<tr>
<td>`.id-generator`</td>
<td>Configure idGenerator. Allowed values: `simple`, `strong`, `prefixed`. `prefixed` id generator is like `strong`, but uses a Spring application name (`${spring.application.name}) as the prefix for each id.</td>
<td>`strong`</td>
</tr>

<tr>
<td>`.version`</td>
<td>Version of the process engine</td>
<td>Read only value, e.g., 7.4.0</td>
</tr>

<tr>
<td>`.formatted-version`</td>
<td>Formatted version of the process engine</td>
<td>Read only value, e.g., (v7.4.0)</td>
</tr>

<tr>
<td>`.deployment-resource-pattern`</td>
<td>Location for auto deployment</td>
<td>`classpath*:**/*.bpmn, classpath*:**/*.bpmn20.xml, classpath*:**/*.dmn, classpath*:**/*.dmn11.xml, classpath*:**/*.cmmn, classpath*:**/*.cmmn10.xml, classpath*:**/*.cmmn11.xml`</td>
</tr>

<tr><td colspan="4">*Process application*</td></tr>

<tr>
<td rowspan="5"><a name="camunda-bpm-application"></a>`camunda.bpm.application`</td>
<td>`.delete-upon-undeploy`</td>
<td>Indicates whether the undeployment of the process archive should trigger deleting the process engine deployment. If the process engine deployment is deleted, 
all running and historic process instances are removed as well.</td>
<td>`false`</td>
</tr>

<tr>
<td>`.scan-for-process-definitions`</td>
<td>Indicates whether the classloader should be scanned for process definitions.</td>
<td>`true`</td>
</tr>

<tr>
<td>`.deploy-changed-only`</td>
<td>Indicates whether only changed resources should be part of the deployment. This is independent of the setting that if no resources change, no deployment 
takes place but the previous deployment is resumed.</td>
<td>`false`</td>
</tr>

<tr>
<td>`.resume-previous-versions`</td>
<td>Indicates whether old versions of the deployment should be resumed.</td>
<td>`false`</td>
</tr>

<tr>
<td>`.resume-previous-by`</td>
<td>Indicates which previous deployments should be resumed by this deployment.</td>
<td>`process-definition-key`</td>
</tr>

<tr><td colspan="4">*Job Execution*</td></tr>

<tr>
<td rowspan="3">`camunda.bpm.job-execution`</td>
<td>`.enabled`</td>
<td>If set to `false`, no JobExecutor bean is created at all. Maybe used for testing.</td>
<td>`true`</td>
</tr> 

<tr>
<td>`.deployment-aware`</td>
<td>If job executor is deployment aware</td>
<td>`false`</td>
</tr> 
<tr>
<td>`.core-pool-size`</td>
<td>Set to value > 1 to activate parallel job execution.</td>
<td>`3`</td>
</tr> 
<tr>
<td>`.max-pool-size`</td>
<td>Maximum number of parallel threads executing jobs</td>
<td>`10`</td>
</tr> 

<tr><td colspan="4">*Datasource*</td></tr>

<tr>
<td rowspan="4">`camunda.bpm.database`</td>
<td>`.schema-update`</td>
<td>If automatic schema update should be applied, use one of [true, false, create, create-drop, drop-create]</td>
<td>`true`</td>
</tr> 

<tr>
<td>`.type`</td>
<td>Yype of the underlying database. Possible values: `h2`, mysql, mariadb, oracle, postgres, mssql, db2.</td>
<td>Will be automatically determined from datasource</td>
</tr> 

<tr>
<td>`.table-prefix`</td>
<td>Prefix of the camunda database tables. Attention: The table prefix will *not* be applied if you  are using `schema-update`!</td>
<td>_Camunda default value_</td>
</tr> 

<tr>
<td>`.schema-name`</td>
<td>The dataBase schema name</td>
<td>_Camunda default value_</td>
</tr> 

<tr><td colspan="4">*JPA*</td></tr>
<tr>
<td rowspan="4">`camunda.bpm.jpa`</td>
<td>`.enabled`</td>
<td>Enables jpa configuration</td>
<td>`true`. Depends on `entityManagerFactory` bean.</td>
</tr> 

<tr>
<td>`.persistence-unit-name`</td>
<td>JPA persistence unit name</td>
<td>-</td>
</tr> 

<tr>
<td>`.close-entity-manager`</td>
<td>Close JPA entity manager</td>
<td>`true`</td>
</tr> 

<tr>
<td>`.handle-transaction`</td>
<td>JPA handle transaction</td>
<td>`true`</td>
</tr> 

<tr><td colspan="4">*Management*</td></tr>
<tr>
<td>`camunda.bpm.management`</td>
<td>`.health.camunda.enabled`</td>
<td>Enables default camunda health indicators</td>
<td>`true`</td>
</tr> 

<tr><td colspan="4">*Metrics*</td></tr>
<tr>
<td rowspan="2">`camunda.bpm.metrics`</td>
<td>`.enabled`</td>
<td>Enables metrics reporting</td>
<td>_Camunda default value_</td>
</tr> 

<tr>
<td>`.db-reporter-activate`</td>
<td>Enables db metrics reporting</td>
<td>_Camunda default value_</td>
</tr> 

<tr><td colspan="4">*Webapp*</td></tr>
<tr>
<td>`camunda.bpm.webapp`</td>
<td>`.index-redirect-enabled`</td>
<td>Registers a redirect from `/` to camundas bundled `index.html`</td>
<td>`true`</td>
</tr> 

<tr><td colspan="4">*Authorization*</td></tr>
<tr>
<td rowspan="4">`camunda.bpm.authorization`</td>
<td>`.enabled`</td>
<td>Enables authorization</td>
<td>_Camunda default value_</td>
</tr> 

<tr>
<td>`.enabled-for-custom-code`</td>
<td>Enables authorization for custom code</td>
<td>_Camunda default value_</td>
</tr> 

<tr>
<td>`.authorization-check-revokes`</td>
<td>Configures authorization check revokes</td>
<td>_Camunda default value_</td>
</tr> 

<tr>
<td>`.tenant-check-enabled`</td>
<td>Performs tenant checks to ensure that an authenticated user can only access data that belongs to one of his tenants.</td>
<td>`true`</td>
</tr> 

<tr><td colspan="4">*Admin User*</td></tr>
<tr>
<td rowspan="3">`camunda.bpm.admin-user`</td>
<td>`.id`</td>
<td>The username (e.g., 'admin')</td>
<td>-</td>
</tr> 

<tr>
<td>`.password`</td>
<td>The initial password</td>
<td>=`id`</td>
</tr> 

<tr>
<td>`.firstName`, `.lastName`, `.email`</td>
<td>Additional (optional) user attributes</td>
<td>Defaults to value of 'id'</td>
</tr> 

<tr><td colspan="4">*Filter*</td></tr>
<tr>
<td>`camunda.bpm.filter`</td>
<td>`.create`</td>
<td>Name of a "show all" filter. If set, a new filter is created on start that displayes all tasks. Useful for testing on h2 db.</td>
<td>-</td>
</tr> 

</table>
