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

Applies the history configuration to the process engine. If not configured, the history level [FULL]({{< ref "/user-guide/process-engine/history.md#choose-a-history-level" >}}) is used.
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
<tr><td colspan="4"><b>General</b></td></tr>

<tr><td rowspan="11"><code>camunda.bpm</code></td>
<td><code>.enabled</code></td>
<td>Switch to disable the Camunda auto-configuration. Use to exclude Camunda in integration tests.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.process-engine-name</code></td>
<td>Name of the process engine</td>
<td>Camunda default value</td>
</tr>
<tr>
<td><code>.default-serialization-format</code></td>
<td>Default serialization format</td>
<td>Camunda default value</td>
</tr>

<tr>
<td><code>.history-level</code></td>
<td>Camunda history level</td>
<td>FULL</td>
</tr>

<tr>
<td><code>.history-level-default</code></td>
<td>Camunda history level to use when <code>history-level</code> is <code>auto</code>, but the level can not determined automatically</td>
<td>FULL</td>
</tr>

<tr>
<td><code>.auto-deployment-enabled</code></td>
<td>If processes should be auto deployed. This is disabled when using the SpringBootProcessApplication</td>
<td><code>true</code></td>
</tr>

<tr>
<td><a name="license-file"></a><code>.license-file</code></td>
<td>Provides an URL to your Camunda license file and is automatically inserted into the DB when the application starts (but only if no license key is found in the DB).</td>
<td>By default, the license key will be loaded:
 <ol>
  <li>from the file with the name <code>camunda-license.txt</code> from classpath (if present)</li>
  <li>from path <i>${user.home}/.camunda/license.txt</i> (if present)</li>
 </ol>
 The license must be exactly in the format as we sent it to you including the header and footer line. Bear in mind that for some licenses there is a minimum <a href="{{<ref "/webapps/admin/system-management.md#license-compatibility" >}}">version requirement</a>.
</td>
</tr>

<tr>
<td><code>.id-generator</code></td>
<td>Configure idGenerator. Allowed values: <code>simple</code>, <code>strong</code>, <code>prefixed</code>. <code>prefixed</code> id generator is like <code>strong</code>, but uses a Spring application name (<code>${spring.application.name}</code>) as the prefix for each id.</td>
<td><code>strong</code></td>
</tr>

<tr>
<td><code>.version</code></td>
<td>Version of the process engine</td>
<td>Read only value, e.g., 7.4.0</td>
</tr>

<tr>
<td><code>.formatted-version</code></td>
<td>Formatted version of the process engine</td>
<td>Read only value, e.g., (v7.4.0)</td>
</tr>

<tr>
<td><code>.deployment-resource-pattern</code></td>
<td>Location for auto deployment</td>
<td><code>classpath*:**/*.bpmn, classpath*:**/*.bpmn20.xml, classpath*:**/*.dmn, classpath*:**/*.dmn11.xml, classpath*:**/*.cmmn, classpath*:**/*.cmmn10.xml, classpath*:**/*.cmmn11.xml</code></td>
</tr>

<tr><td colspan="4"><b>Job Execution</b></td></tr>

<tr>
<td rowspan="3"><code>camunda.bpm.job-execution</code></td>
<td><code>.enabled</code></td>
<td>If set to <code>false</code>, no JobExecutor bean is created at all. Maybe used for testing.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.deployment-aware</code></td>
<td>If job executor is deployment aware</td>
<td><code>false</code></td>
</tr>
<tr>
<td><code>.core-pool-size</code></td>
<td>Set to value > 1 to activate parallel job execution.</td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>.max-pool-size</code></td>
<td>Maximum number of parallel threads executing jobs</td>
<td><code>10</code></td>
</tr>

<tr><td colspan="4"><b>Datasource</b></td></tr>

<tr>
<td rowspan="4"><code>camunda.bpm.database</code></td>
<td><code>.schema-update</code></td>
<td>If automatic schema update should be applied, use one of [true, false, create, create-drop, drop-create]</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.type</code></td>
<td>Type of the underlying database. Possible values: <code>h2</code>, mysql, mariadb, oracle, postgres, mssql, db2.</td>
<td>Will be automatically determined from datasource</td>
</tr>

<tr>
<td><code>.table-prefix</code></td>
<td>Prefix of the camunda database tables. Attention: The table prefix will <b>not</b> be applied if you  are using <code>schema-update</code>!</td>
<td><i>Camunda default value</i></td>
</tr>

<tr>
<td><code>.schema-name</code></td>
<td>The dataBase schema name</td>
<td><i>Camunda default value</i></td>
</tr>

<tr><td colspan="4"><b>JPA</b></td></tr>
<tr>
<td rowspan="4"><code>camunda.bpm.jpa</code></td>
<td><code>.enabled</code></td>
<td>Enables jpa configuration</td>
<td><code>true</code>. Depends on <code>entityManagerFactory</code> bean.</td>
</tr>

<tr>
<td><code>.persistence-unit-name</code></td>
<td>JPA persistence unit name</td>
<td>-</td>
</tr>

<tr>
<td><code>.close-entity-manager</code></td>
<td>Close JPA entity manager</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.handle-transaction</code></td>
<td>JPA handle transaction</td>
<td><code>true</code></td>
</tr>

<tr><td colspan="4"><b>Management</b></td></tr>
<tr>
<td><code>camunda.bpm.management</code></td>
<td><code>.health.camunda.enabled</code></td>
<td>Enables default camunda health indicators</td>
<td><code>true</code></td>
</tr>

<tr><td colspan="4"><b>Metrics</b></td></tr>
<tr>
<td rowspan="2"><code>camunda.bpm.metrics</code></td>
<td><code>.enabled</code></td>
<td>Enables metrics reporting</td>
<td><i>Camunda default value</i></td>
</tr>

<tr>
<td><code>.db-reporter-activate</code></td>
<td>Enables db metrics reporting</td>
<td><i>Camunda default value</i></td>
</tr>

<tr><td colspan="4"><b>Webapp</b></td></tr>
<tr>
<td><code>camunda.bpm.webapp</code></td>
<td><code>.index-redirect-enabled</code></td>
<td>Registers a redirect from <code>/</code> to camunda's bundled <code>index.html</code>.
<br/>
If this property is set to <code>false</code>, the
<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc-welcome-page">default</a>
Spring Boot behaviour is taken into account.</td>
<td><code>true</code></td>
</tr>

<tr id="csrf">
  <td rowspan="9"><code>camunda.bpm.webapp.csrf</code></td>
</tr>
<tr>
<td><code>.target-origin</code></td>
<td>Sets the application expected deployment domain. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><i>Not set</i></td>
</tr>
<tr>
<td><code>.deny-status</code></td>
<td>Sets the HTTP response status code used for a denied request. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><code>403</code></td>
</tr>
<tr>
<td><code>.random-class</code></td>
<td>Sets the name of the class used to generate tokens. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><code>java.security.SecureRandom</code></td>
</tr>
<tr>
<td><code>.entry-points</code></td>
<td>Sets additional URLs that will not be tested for the presence of a valid token. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.enable-secure-cookie</code></td>
  <td>
    If set to <code>true</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#secure" >}}">Secure</a> is enabled.
  </td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.enable-same-site-cookie</code></td>
  <td>
    If set to <code>false</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#samesite" >}}">SameSite</a> is disabled. The default value of the <code>SameSite</code> cookie is <code>LAX</code> and it can be changed via <code>same-site-cookie-option</code> configuration property.
  </td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.same-site-cookie-option</code></td>
  <td>
    Can be configured either to <code>STRICT</code> or <code>LAX</code>.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
      <li>Cannot be set in conjunction with <code>same-site-cookie-value</code></li>
    </ul>
  </td>
  <td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.same-site-cookie-value</code></td>
  <td>
    A custom value for the cookie property.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
      <li>Cannot be set in conjunction with <code>same-site-cookie-option</code></li>
    </ul>
  </td>
  <td><i>Not set</i></td>
</tr>

<tr><td colspan="4"><b>Authorization</b></td></tr>
<tr>
<td rowspan="4"><code>camunda.bpm.authorization</code></td>
<td><code>.enabled</code></td>
<td>Enables authorization</td>
<td><i>Camunda default value</i></td>
</tr>

<tr>
<td><code>.enabled-for-custom-code</code></td>
<td>Enables authorization for custom code</td>
<td><i>Camunda default value</i></td>
</tr>

<tr>
<td><code>.authorization-check-revokes</code></td>
<td>Configures authorization check revokes</td>
<td><i>Camunda default value</i></td>
</tr>

<tr>
<td><code>.tenant-check-enabled</code></td>
<td>Performs tenant checks to ensure that an authenticated user can only access data that belongs to one of his tenants.</td>
<td><code>true</code></td>
</tr>

<tr><td colspan="4"><b>Admin User</b></td></tr>
<tr>
<td rowspan="3"><code>camunda.bpm.admin-user</code></td>
<td><code>.id</code></td>
<td>The username (e.g., 'admin')</td>
<td>-</td>
</tr>

<tr>
<td><code>.password</code></td>
<td>The initial password</td>
<td>=<code>id</code></td>
</tr>

<tr>
<td><code>.firstName</code>, <code>.lastName</code>, <code>.email</code></td>
<td>Additional (optional) user attributes</td>
<td>Defaults to value of 'id'</td>
</tr>

<tr><td colspan="4"><b>Filter</b></td></tr>
<tr>
<td><code>camunda.bpm.filter</code></td>
<td><code>.create</code></td>
<td>Name of a "show all" filter. If set, a new filter is created on start that displays all tasks. Useful for testing on h2 db.</td>
<td>-</td>
</tr>

</table>

## Session Cookie

You can configure the **Session Cookie** for the Spring Boot application via the `application.yaml` configuration file.

Camunda Spring Boot Starter versions:

<= 2.3 (Spring Boot version 1.x)

```yaml
server:
  session:
    cookie:
      secure: true
      http-only: true # Not possible for versions before 1.5.14
```

\>= 3.0 (Spring Boot version 2.x)

```yaml
server:
  servlet:
    session:
      cookie:
        secure: true
        http-only: true # Not possible for versions before 2.0.3
```