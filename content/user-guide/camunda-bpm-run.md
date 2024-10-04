---

title: 'Camunda 7 Run'
weight: 50

menu:
  main:
    identifier: "camunda-bpm-run-guide"
    parent: "user-guide"

---

This guide gives an introduction to Camunda Run, a pre-packaged, lightweight distribution of Camunda 7. Camunda Run is easy to configure and does not require Java knowledge.

# Prerequisites and audience

To use this guide, you should at least know what Camunda 7 is and what it does. Check out the [Get Started guides](https://docs.camunda.org/get-started/quick-start/) if you have never used Camunda 7 before. The [Installation guide]({{< ref "/installation/camunda-bpm-run.md" >}}) is also worth looking at if you are completely new to Camunda 7.

This guide will teach you about Camunda Run and how to configure it. It can serve as a reference page for configuration and operation options. It will not give you a step-by-step guide on how to install Camunda Run. Head over to the [Installation guide]({{< ref "/installation/camunda-bpm-run.md" >}}) for details on how to install and start Camunda Run.

# What is Camunda Run?

Camunda Run is a full distribution of Camunda 7. It includes:

* Camunda web applications
  * Cockpit
  * Tasklist
  * Admin
* [REST API]({{< ref "/reference/rest/overview/_index.md" >}})
* [An example application](#example-application)

# Starting with Camunda Run

To start with Camunda Run, download the [distribution](https://downloads.camunda.cloud/release/camunda-bpm/run/) ([enterprise](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/run/)) and unpacking it. You will find the following structure:

```
camunda-bpm-run
├── configuration/
│   ├── keystore/
│   │   └── put your SSL key store here if you want to use HTTPS
│   ├── resources/
│   │   └── put your BPMN files, forms and scripts here
│   ├── sql/
│   │   └── necessary SQL scripts to prepare your database system
│   ├── userlib/
│   │   └── put your database driver and other required JARs here
│   ├── default.yml
│   └── production.yml
├── internal/
├── start.bat
└── start.sh
└── shutdown.sh
└── shutdown.bat
```

Execute one of the two start scripts (`start.bat` for Windows, `start.sh` for Linux/Mac). After a few seconds, you can 
access the Camunda web apps via http://localhost:8080/camunda/app/, the REST API via 
http://localhost:8080/engine-rest/.

When executing one of the two start scripts without any arguments, Camunda Run will start with a default configuration 
as a detached process. To shut down Camunda Run in "detached" mode, use one of the two shutdown scripts (`shutdown.bat` 
for Windows, `shutdown.sh` for Linux/Mac).

By explicitly passing arguments to one of the two Camunda Run start scripts, the default detached mode is disabled and
you can configure Camunda Run according to your needs. Furthermore, Camunda Run will start as a foreground process
unless the `--detached` argument is explicitly passed to the `start.bat` or `start.sh` script.

## Start script arguments

The start scripts (`start.bat` for Windows, `start.sh` for Linux/Mac) accept the following arguments:

<table class="table desc-table">
  <tr>
      <th>Argument</th>
      <th>Description</th>
      <th>Default state</th>
  </tr>
  <tr>
      <td><code>--webapps</code></td>
      <td>Enables the Camunda web apps</td>
      <td><code>enabled</code></td>
  </tr>
  <tr>
      <td><code>--rest</code></td>
      <td>Enables the REST API</td>
      <td><code>enabled</code></td>
  </tr>
  <tr>
      <td><code>--example</code></td>
      <td>Enables the example application.</td>
      <td><code>enabled</code></td>
  </tr>
  <tr>
      <td><code>--production</code></td>
      <td>Applies the `production.yaml` configuration file.</td>
      <td><code>disabled</code></td>
  </tr>
  <tr>
      <td><code>--detached</code></td>
      <td>
        Starts Camunda Run as a detached process. This is the default behavior of the start scripts. To disable it, 
        explicitly pass a valid argument to the script.
      </td>
      <td><code>enabled</code></td>
  </tr>
  <tr>
      <td><code>--oauth2</code></td>
      <td>
        Enables Spring Security OAuth2 integration.
        See dedicated <a href="{{< ref "/user-guide/spring-boot-integration/spring-security.md" >}}">Spring Security OAuth2 Integration</a> documentation for details.
      </td>
      <td><code>false</code></td>
  </tr>
  <tr>
      <td><code>--help</code></td>
      <td>Prints a message showing the available start script arguments.</td>
      <td><code>-</code></td>
  </tr>
</table>

## Starting Camunda Run using Docker

Camunda Run is also available as a Docker image. Please see the Camunda Run section of the Camunda Docker documentation [here]({{< ref "/installation/docker.md#start-camunda-bpm-run-using-docker" >}}) for more details.

## Optional components

By default, Camunda Run launches with the web apps, REST API and example modules. If you want to enable only a subset of them, execute the start script through a command-line interface with any of the `--webapps`, `--rest` or `--example` properties to enable the specific modules.

### Example application

By default, Camunda Run deploys and launches an example application on startup.
When launched, this application creates deployments with multiple BPMN and DMN definitions as well as form resources
and starts instances of the defined processes.

You can disable the *deployment* of the example application itself by enabling any combination of the other modules with the `--webapps` and `--rest` properties of the start script.
That way, the example application will not be launched and its resources will not be present on the classpath of Camunda Run.

You can also disable the *launch* of the example application by setting the application property `camunda.bpm.run.example.enabled` to `false`
or removing it from the application properties.
That way, the example application and its resources will be present on the classpath of Camunda Run.
However, the example application will not be started.

Disabling the example application with any of those mechanisms will **NOT** delete any deployments or process instances from Camunda Run once they are created.
You have to delete this data manually through the [web apps]({{< ref "/webapps/cockpit/deployment-view.md#delete" >}}), the 
{{< restref page="deleteDeployment" text="REST API" tag="Deployment" >}}, or by cleaning the database 
[configured in the application properties](#database).

## Choose between default and production configuration

Camunda Run ships with two different configuration files which are both located in the `configuration` folder. 

* The `default.yml` configuration only contains necessary configuration like the H2 database, a demo user and [CORS](#cross-origin-resource-sharing) for REST calls from a client application.
* The `production.yml` configuration is intended to provide the recommended properties according to the [Security Instructions]({{< ref "/user-guide/security.md" >}}). 
  When using Camunda Run in a production environment, make sure to base your custom configuration on this one and carefully read through the security instructions.

By default, Run launches with the `default.yml` configuration. To enable the `production.yml` configuration, execute the start script with the `--production` property.
Using `--production` disables the example application. It can be enabled by explicitly passing `--example` to the start script.
However, we do not recommended to use the example application in production.

## Connect to a Database

Camunda Run is pre-configured to use a file-based H2 database for testing. The database schema and all required tables are automatically created when the engine starts up for the first time. If you want to use a custom standalone database, follow these steps:

1. Make sure your database is among the [supported database systems]({{< ref "/introduction/supported-environments.md#supported-database-products" >}}).
2. Create a database schema for Camunda 7 yourself.
3. Install the database schema to create all required tables and default indices using our [database schema installation guide]({{< ref "/installation/database-schema.md" >}}).
4. Drop a JDBC driver jar for your database system in the `configuration/userlib` folder.
5. Add the JDBC URL and login credentials to the configuration file like described [below](#database).
6. Restart Camunda Run

## Deploy BPMN Models

In the unpacked distro, you will find a `resources` folder. All files (including BPMN, DMN, CMMN, form, and script files) will be deployed when you start Camunda Run.

You can reference forms and scripts in the BPMN diagram with `embedded:deployment:/my-form.html`, `camunda-forms:deployment:/myform.form`, or `deployment:/my-script.js`. The deployment requires adding an extra `/` as a prefix to the filename.

Deployments via the {{< restref page="createDeployment" text="REST API" tag="Deployment" >}} are still possible.

## Automatic License Pickup

If you downloaded the enterprise version of Camunda Run, you will need a license key to enable the enterprise 
features. Please see the [dedicated License section]({{< ref "/user-guide/license-use.md#with-the-camunda-spring-boot-starter-camunda-run" >}}) 
of the docs, to learn more.

# Configure Camunda Run

Just like all the other distros, you can tailor Camunda Run to your needs. To do this, you only have to edit one of the [configuration files](#choose-between-default-and-production-configuration) that you can find in the configuration folder.

{{< note title="Note:" class="info" >}}
Camunda Run is based on the [Camunda Spring Boot Starter](https://github.com/camunda/camunda-bpm-platform/tree/master/spring-boot-starter). 
All [configuration properties]({{< ref "/user-guide/spring-boot-integration/configuration.md#camunda-engine-properties" >}}) from the camunda-spring-boot-starter are available to customize Camunda Run.
{{< /note >}}

## Database

The distro comes with a file-based h2 database for testing. It is recommended to connect to a standalone database system for use in production.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>spring.datasource</code></td>
      <td><code>.url</code></td>
      <td>The jdbc URL for the database.</td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.driver-class-name</code></td>
      <td>The class name of the JDBC driver for your database system. Remember to put the driver jar for your database system in <code>configuration/userlib</code>.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>.username</code></td>
      <td>The username for the database connection.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>.password</code></td>
      <td>The password for the database connection.</td>
      <td>-</td>
  </tr>
</table>

## Authentication

To add authentication to requests against the [REST API]({{< ref "/reference/rest/overview/_index.md" >}}), you can enable basic authentication.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.auth</code></td>
      <td><code>.enabled</code></td>
      <td>Switch to enable basic authentication for requests to the REST API.</td>
      <td><code>false</code></td>
  </tr>
  <tr>
      <td><code>.authentication</code></td>
      <td>Authentication method, currently only basic is supported.</td>
      <td>basic</td>
  </tr>
</table>

## Cross-Origin Resource Sharing

If you want to allow cross-origin requests to the [REST API]({{< ref "/reference/rest/overview/_index.md" >}}), you need to enable CORS.
<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.cors</code></td>
      <td><code>.enabled</code></td>
      <td>Switch to enable CORS.</td>
      <td><code>false</code></td>
  </tr>
  <tr>
      <td><code>.allowed-origins</code></td>
      <td>Origins that are allowed to make CORS requests. Multiple origins can be separated with commas. To support both HTTP authentication and CORS, <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials"><code>allowed-origins</code> must not be</a> <code>\*</code>. To allow Camunda Modeler to deploy with authentication, including <code>file://</code> in the allowed origins.</td>
      <td><code>\*</code> (all origins, including <code>file://</code>)</td>
  </tr>
  <tr>
      <td><code>.allowed-headers</code></td>
      <td>Headers that are allowed to be passed with CORS requests. Multiple headers can be separated with commas.</td>
      <td><code>Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers</code></td>
  </tr>
  <tr>
      <td><code>.exposed-headers</code></td>
      <td>Headers that can be read by browsers from a CORS response. Simple response headers should not be 
          included in this list. Multiple headers can be separated with commas.
      </td>
      <td>None</td>
  </tr>
  <tr>
      <td><code>.allow-credentials</code></td>
      <td>A boolean flag that helps a browser determine it can make a CORS request using credentials.</td>
      <td><code>false</code></td>
  </tr>
  <tr>
      <td><code>.preflight-maxage</code></td>
      <td>Determines how long a browser can cache the result of a pre-flight request in seconds.</td>
      <td><code>1800</code></td>
  </tr>
</table>

## REST

Camunda Run can be configured to disable the REST endpoint which exposes the WADL file via a property.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.rest</code></td>
      <td><code>.disable-wadl</code></td>
      <td>Disables the REST endpoint <code>/application.wadl</code>. Web Application Description Language (WADL) is an XML description of the deployed RESTful web application.</td>
      <td><code>false</code></td>
  </tr>
</table>

## Deployment

Camunda Run also supports configuration options for customizing the deployment.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.deployment</code></td>
      <td><code>.deploy-changed-only</code></td>
      <td>
          <ul>
            <li>When set to <code>true</code>, only deployments with changed resources will be deployed to the engine database.</li>
            <li>When set to <code>false</code>, all deployments will be deployed without filtering their resources.</li>
          </ul>
          The property can be useful for controlling the deployment behaviour of the engine in case of restarts, similar to the
          <a href="{{< ref "user-guide/spring-framework-integration/deployment" >}}">Spring Framework Integration</a>
      </td>
      <td><code>true</code></td>
  </tr>
</table>

## LDAP Identity Service

Camunda 7 can manage users and authorizations on its own, but if you want to use an existing LDAP authentication database you can enable the [LDAP Identity Service Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}})
which provides read-only access to the LDAP repository.

Find all available configuration properties in the [LDAP Plugin Guide]({{< ref "/user-guide/process-engine/identity-service.md#configuration-properties-of-the-ldap-plugin" >}})

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.ldap</code></td>
      <td><code>.enabled</code></td>
      <td>Switch to enable the LDAP identity service plugin.</td>
      <td><code>false</code></td>
  </tr>
</table>

### LDAP Administrator Authorization

You can also use the [Administrator Authorization plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}) 
to ensure the appropriate LDAP user or group gains administrative access. Review all the available 
configuration options in the [Administrator Authorization plugin section]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}})
of our documentation.

In the table below, observe the Camunda Run-specific properties for the Administrator Authorization plugin.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.admin-auth</code></td>
      <td><code>.enabled</code></td>
      <td>Switch to enable the Administrator Authorization plugin.</td>
      <td><code>false</code></td>
  </tr>
</table>

## Plugin registration

Camunda Run supports two types of plugins. 

* [Process engine plugins][engine-plugins] can be used to extend the process engine configuration to add more functionality.
* [Webapp plugins][cockpit-plugins] are used to extend one of the Camunda webapps (i.e. Cockpit, Tasklist, Admin, Welcome).

Both types of plugins are supported in Camunda Run but have to be registered differently.

### Process engine plugin registration

Camunda 7 provides a process engine plugin mechanism to enable users to add and adjust
process engine features by extending the process engine configuration. You can use plugins developed by Camunda, or by
third-party developers.

Get more details on how process engine plugins work on the dedicated [process engine plugins][engine-plugins] 
documentation section.

In the table below, observe the Camunda Run-specific properties for registering process engine plugins.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td><code>camunda.bpm.run</code></td>
      <td><code>.process-engine-plugins</code></td>
      <td>Define your process engine plugin configurations under this YAML property.</td>
      <td>Empty <code>List</code></td>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.process-engine-plugins</code></td>
      <td><code>.plugin-class</code></td>
      <td>Part of a <code>process-engine-plugins</code> list item. Defines the process engine plugin class.</td>
      <td>none</td>
  </tr>
  <tr>
      <td><code>.plugin-parameters</code></td>
      <td>
          Part of a <code>process-engine-plugins</code> list item. Defines the process engine plugin parameters 
          as <code>key:value</code> pairs.
      </td>
      <td>Empty <code>Map</code></td>
  </tr>
</table>

Perform the following steps in Camunda Run to register process engine plugins:

1. Find and read the process engine plugin documentation.
  * Find the canonical name of the process engine plugin Java class that implements the `ProcessEnginePlugin` interface.
  * Find out if the process engine plugin provides any configuration parameters. You will be able to configure your plugin using those parameters. If the plugin does not provide any properties, skip this step.
1. Download the process engine plugin `.jar` file and place it to the `${RUN_HOME}/configuration/userlib/` directory.
1. In your Camunda Run configuration file, add the process engine plugin class and any configuration parameters as 
   list items under the `process-engine-plugins` YAML property.

Once complete, your YAML configuration file should look similar to the following:

```yaml
  camunda.bpm.run.process-engine-plugins:
    - plugin-class: canonical.name.of.the.PluginClass
```

#### Example process engine plugin registration

Let's say that you want to register a process engine plugin called `TestPlugin`. The following information is 
available:

* The plugin is provided in a `.jar` archive called `camunda-bpm-test-plugin.jar`. 
* The name of the Java class that implements the `ProcessEnginePlugin` interface is `TestPlugin`. The canonical name of this class is 
`org.camunda.bpm.run.test.plugins.TestPlugin`.
* The `TestPlugin` exposes the following two configuration parameters:
  * `parameterOne` - a `String` value
  * `parameterTwo` - a `Boolean` value

We'll take the following steps:

1. Place the `camunda-bpm-test-first-plugin.jar` archive in 
the `${RUN_HOME}/configuration/userlib/` directory.

2. Add the following content to your Camunda Run YAML configuration file.

```yaml
camunda.bpm.run.process-engine-plugins:
  - plugin-class: org.camunda.bpm.run.test.plugins.TestPlugin
    plugin-parameters:
      parameterOne: valueOne
      parameterTwo: true
```

In the example above, we use the `TestPlugin` canonical name as a YAML key. The YAML value consists of a 
collection of key-value pairs that represent the configuration parameters for the `TestPlugin` and their values.
Some process engine plugins don't have configuration parameters. For these, you only need to define the `plugin-class` 
YAML property, like so:

```yaml
camunda.bpm.run.process-engine-plugins:
  - plugin-class: org.camunda.bpm.run.test.plugins.TestPlugin
  - plugin-class: org.camunda.bpm.run.test.plugins.AnotherPlugin
```

3. Start Camunda Run. The `TestPlugin` will be read from the YAML configuration and registered with the
process engine.

### Webapp plugin registration

Camunda 7 provides a mechanism to extend the Camunda Webapps with your own functionality. You can add plugins at various plugin points. For example, the processes dashboard in Cockpit.

A webapp plugin is a maven jar project that provides a server-side and a client-side extension to the webapp. You can find more information about how to structure your plugins [here]({{< ref "/webapps/cockpit/extend/plugins.md#the-nature-of-a-cockpit-plugin" >}}).

To register a webapp plugin, simply drop the jar file into the `configuration/userlib` folder. See [the Starting with Camunda Run section](#starting-with-camunda-platform-run) of this guide to find out how to navigate the directories of Camunda Run.

## Example application launch

Camunda Run comes with a [demo application](#example-application) that deploys resources and starts process instances.
You can disable the start of that application so it does not create deployments and process instances. The resources of the application
are however still accessible on the classpath of Camunda Run. Consult the [example application section](#example-application) for further details.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>camunda.bpm.run.example</code></td>
      <td><code>.enabled</code></td>
      <td>Switch to enable the example application.</td>
      <td><code>false</code></td>
  </tr>
</table>

## HTTPS

Camunda Run supports HTTPS over SSL. To enable it, you will need a valid SSL certificate signed by a trusted provider and stored in a key store file (either .jks or .p12).
For testing, we included a self-signed certificate. You should not use this in production. To enable it, add the following properties to your configuration file.

```yaml
server:
  ssl:
    key-store: classpath:keystore.p12
    key-store-password: camunda
    key-store-type: pkcs12
    key-alias: camunda
    key-password: camunda
  port: 8443
```
After starting Camunda Run, you can access the webapps via https://localhost:8443/camunda/app/ and the REST API via https://localhost:8443/engine-rest/.

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>server.ssl</code></td>
      <td><code>.key-store</code></td>
      <td>Name of the key store file that holds the SSL certificate. This file must be placed in the <code>configuration/keystore</code> folder and has to be either a .jks or a .p12 file.</td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.key-store-password</code></td>
      <td>Password to access the key store.</td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.key-store-type</code></td>
      <td>Type of the key store. Can either be <code>jks</code> or <code>p12</code></td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.key-alias</code></td>
      <td>Name that identifies the SSL certificate in the key store.</td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.key-password</code></td>
      <td>Password to access the SSL certificate in the key store.</td>
      <td><code>-</code></td>
  </tr>
</table>

## Logging

Camunda 7 provides fine-grained and customizable logging. An overview of the available logging categories can be found in the [Logging User Guide]({{< ref "/user-guide/logging.md#process-engine" >}}).
To configure the logging behavior in Camunda Run, customize your configuration file with the following properties.

For more information on logging configuration visit the [Spring Boot Logging Guide](https://docs.spring.io/spring-boot/docs/2.4.0/reference/html/spring-boot-features.html#boot-features-logging).

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>logging</code></td>
      <td><code>.level.root</code></td>
      <td>Set a logging level for all available logging categories. Value can be one of the following: <code>OFF</code>. <code>ERROR</code>. <code>WARN</code>. <code>INFO</code>. <code>DEBUG</code>. <code>FATAL</code>. <code>TRACE</code></td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.level.{logger-name}</code></td>
      <td>Set a logging level for a specific logging category. Find an overview over the available categories in the <a href="{{<ref "/user-guide/logging.md#process-engine" >}}">Logging User Guide</a>.
      Value can be one of the following: <code>OFF</code>. <code>ERROR</code>. <code>WARN</code>. <code>INFO</code>. <code>DEBUG</code>. <code>FATAL</code>. <code>TRACE</code></td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.file.name</code></td>
      <td>Specify a log file location. (e.g. <code>logs/camunda-bpm-run-log.txt</code>)</td>
      <td><code>-</code></td>
  </tr>
</table>


[engine-plugins]: {{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}
[cockpit-plugins]: {{< ref "/webapps/cockpit/extend/plugins.md" >}}