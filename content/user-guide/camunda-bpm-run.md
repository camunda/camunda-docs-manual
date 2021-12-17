---

title: 'Camunda Platform Run'
weight: 50

menu:
  main:
    identifier: "camunda-bpm-run-guide"
    parent: "user-guide"

---

This guide gives an introduction to Camunda Platform Run, a pre-packaged, lightweight distribution of the Camunda Platform. Camunda Platform Run is easy to configure and does not require Java knowledge.

# Prerequisites and audience

To use this guide, you should at least know what Camunda Platform is and what it does. Check out the [Get Started guides](https://docs.camunda.org/get-started/quick-start/) if you have never used Camunda Platform before. The [Installation guide]({{< ref "/installation/camunda-bpm-run.md" >}}) is also worth looking at if you are completely new to Camunda Platform.

This guide will teach you about Camunda Platform Run and how to configure it. It can serve as a reference page for configuration and operation options. It will not give you a step-by-step guide on how to install Camunda Platform Run. Head over to the [Installation guide]({{< ref "/installation/camunda-bpm-run.md" >}}) for details on how to install and start Camunda Platform Run.

# What is Camunda Platform Run?

Camunda Platform Run is a full distribution of the Camunda Platform. It includes:

* Camunda web applications
  * Cockpit
  * Tasklist
  * Admin
* [REST API]({{< ref "/reference/rest/overview/_index.md" >}})
* [Swagger UI](https://github.com/swagger-api/swagger-ui) (web application for exploring the REST API)
* [An example application](#example-application)

# Starting with Camunda Platform Run

To start with Camunda Platform Run, download the [distribution](https://downloads.camunda.cloud/release/camunda-bpm/run/) ([enterprise](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/run/)) and unpacking it. You will find the following structure:

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
```
Execute one of the two start scripts (`start.bat` for Windows, `start.sh` for Linux/Mac). After a few seconds, you will be able to access the Camunda webapps via http://localhost:8080/camunda/app/, the REST API via http://localhost:8080/engine-rest/ and Swagger UI via http://localhost:8080/swaggerui/.

## Starting Camunda Platform Run using Docker

Camunda Platform Run is also available as a Docker image. Please see the Camunda Platform Run section of the Camunda Docker documentation [here]({{< ref "/installation/docker.md#start-camunda-bpm-run-using-docker" >}}) for more details.

## Optional components

By default, Camunda Platform Run launches with the web apps, REST API, Swagger UI, and example modules. If you want to enable only a subset of them, execute the start script through a command-line interface with any of the `--webapps`, `--rest`, `--swaggerui`, or `--example` properties to enable the specific modules.

### Example application

By default, Camunda Platform Run deploys and launches an example application on startup.
When launched, this application creates deployments with multiple BPMN and DMN definitions as well as form resources
and starts instances of the defined processes.

You can disable the *deployment* of the example application itself by enabling any combination of the other modules with the `--webapps`, `--rest`, and `--swaggerui` properties of the start script.
That way, the example application will not be launched and its resources will not be present on the classpath of Camunda Run.

You can also disable the *launch* of the example application by setting the application property `camunda.bpm.run.example.enabled` to `false`
or removing it from the application properties.
That way, the example application and its resources will be present on the classpath of Camunda Run.
However, the example application will not be started.

Disabling the example application with any of those mechanisms will **NOT** delete any deployments or process instances from Camunda Run once they are created.
You have to delete this data manually through the [web apps]({{< ref "/webapps/cockpit/deployment-view.md#delete" >}}), the 
[REST API]({{< ref "/reference/rest/deployment/delete-deployment.md" >}}), or by cleaning the database 
[configured in the application properties](#database).

## Choose between default and production configuration

Camunda Platform Run ships with two different configuration files which are both located in the `configuration` folder. 

* The `default.yml` configuration only contains necessary configuration like the H2 database, a demo user and [CORS](#cross-origin-resource-sharing) for REST calls from a client application.
* The `production.yml` configuration is intended to provide the recommended properties according to the [Security Instructions]({{< ref "/user-guide/security.md" >}}). 
  When using Camunda Platform Run in a production environment, make sure to base your custom configuration on this one and carefully read through the security instructions.

By default, Run launches with the `default.yml` configuration. To enable the `production.yml` configuration, execute the start script with the `--production` property.
Using `--production` disables Swagger UI and the example application. They can be enabled by explicitly passing `--swaggerui` and `--example` to the start script.
However, we do not recommended to use Swagger UI and the exmaple application in production.

## Connect to a Database

Camunda Platform Run is pre-configured to use a file-based H2 database for testing. The database schema and all required tables are automatically created when the engine starts up for the first time. If you want to use a custom standalone database, follow these steps:

1. Make sure your database is among the [supported database systems]({{< ref "/introduction/supported-environments.md#supported-database-products" >}}).
1. Create a database schema for the Camunda Platform yourself.
1. Install the database schema to create all required tables and default indices using our [database schema installation guide]({{< ref "/installation/database-schema.md" >}}).
1. Drop a JDBC driver jar for your database system in the `configuration/userlib` folder.
1. Add the JDBC URL and login credentials to the configuration file like described [below](#database).
1. Restart Camunda Platform Run

## Deploy BPMN Models

In the unpacked distro, you will find a `resources` folder. All files (including BPMN, DMN, CMMN, form, and script files) will be deployed when you start Camunda Platform Run.

You can reference forms and scripts in the BPMN diagram with `embedded:deployment:/my-form.html`, `camunda-forms:deployment:/myform.form`, or `deployment:/my-script.js`. The deployment requires adding an extra `/` as a prefix to the filename.

Deployments via the [REST API]({{< ref "/reference/rest/deployment/post-deployment.md" >}}) are still possible.

## Automatic License Pickup

If you downloaded the enterprise version of Camunda Platform Run, you will need a license key to enable the enterprise 
features. Please see the [dedicated License section]({{< ref "/user-guide/license-use.md#with-the-camunda-spring-boot-starter-camunda-run" >}}) 
of the docs, to learn more.

# Configure Camunda Platform Run

Just like all the other distros, you can tailor Camunda Platform Run to your needs. To do this, you only have to edit one of the [configuration files](#choose-between-default-and-production-configuration) that you can find in the configuration folder.

{{< note title="Note:" class="info" >}}
Camunda Platform Run is based on the [Camunda Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter). 
All [configuration properties]({{< ref "/user-guide/spring-boot-integration/configuration.md#camunda-engine-properties" >}}) from the camunda-spring-boot-starter are available to customize Camunda Platform Run.
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
      <td>Determines how long a browser can cache the result of a  pre-flight request in seconds.</td>
      <td><code>1800</code></td>
  </tr>
  <tr>
      <td><code>.decorate-request</code></td>
      <td>A boolean flag to tell the CORS Filter to populate the <code>HttpServletRequest</code> instance with 
        <a href="https://tomcat.apache.org/tomcat-9.0-doc/config/filter.html#CORS_Filter_and_HttpServletRequest_attributes">CORS-related attributes</a>.
      </td>
      <td><code>true</code></td>
  </tr>
</table>

## LDAP Identity Service

Camunda Platform can manage users and authorizations on its own, but if you want to use an existing LDAP authentication database you can enable the [LDAP Identity Service Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}})
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

## Example application launch

Camunda Platform Run comes with a [demo application](#example-application) that deploys resources and starts process instances.
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

Camunda Platform Run supports HTTPS over SSL. To enable it, you will need a valid SSL certificate signed by a trusted provider and stored in a key store file (either .jks or .p12).
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
After starting Camunda Platform Run, you can access the webapps via https://localhost:8443/camunda/app/ and the REST API via https://localhost:8443/engine-rest/.

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

Camunda Platform provides fine-grained and customizable logging. An overview of the available logging categories can be found in the [Logging User Guide]({{< ref "/user-guide/logging.md#process-engine" >}}).
To configure the logging behavior in Camunda Platform Run, customize your configuration file with the following properties.

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
      <td>Set a logging level for all available logging categories. Value can be one of the following: <code>OFF</code>. <code>ERROR</code>. <code>WARN</code>. <code>INFO</code>. <code>DEBUG</code>. <code>ALL</code></td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.level.{logger-name}</code></td>
      <td>Set a logging level for a specific logging category. Find an overview over the available categories in the <a href="{{<ref "/user-guide/logging.md#process-engine" >}}">Logging User Guide</a>.
      Value can be one of the following: <code>OFF</code>. <code>ERROR</code>. <code>WARN</code>. <code>INFO</code>. <code>DEBUG</code>. <code>ALL</code></td>
      <td><code>-</code></td>
  </tr>
  <tr>
      <td><code>.file.name</code></td>
      <td>Specify a log file location. (e.g. <code>logs/camunda-bpm-run-log.txt</code>)</td>
      <td><code>-</code></td>
  </tr>
</table>
