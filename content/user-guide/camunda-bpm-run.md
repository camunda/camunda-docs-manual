---

title: 'Camunda BPM Run'
weight: 50

menu:
  main:
    identifier: "camunda-bpm-run-guide"
    parent: "user-guide"

---

Camunda BPM Run is a pre-packaged distro of the Camunda BPM platform, including the Camunda webapps (Cockpit, Tasklist, Admin) and the [REST API]({{< ref "/reference/rest/overview/_index.md" >}}).

The idea behind Run is to provide a full Camunda BPM distro with a simple but powerful configuration mechanism that can be operated by everyone, regardless of their knowledge about Java or application server configuration.

For a step-by-step installation guide head over to the [installation section]({{< ref "/installation/camunda-bpm-run.md" >}}) and get started in minutes.


# Starting with Camunda BPM Run

After downloading the [distro](https://downloads.camunda.cloud/release/camunda-bpm/run/) ([enterprise](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/run/)) and unpacking it to a folder, you will find the following structure:

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
│   │   └── put your database driver jar here
│   ├── default.yml
│   └── production.yml
├── internal/
├── start.bat
└── start.sh
```
Execute one of the two start scripts (`start.bat` for Windows, `start.sh` for Linux/Mac). After a few seconds, you will be able to access the Camunda webapps via http://localhost:8080/camunda/app/ and the REST API via http://localhost:8080/engine-rest/


## Starting Camunda BPM Run using Docker

Camunda BPM Run is also available as a Docker image. Please see the Run section of the Camunda Docker documentation [here]({{< ref "/installation/docker.md#start-camunda-bpm-run-using-docker" >}}) for more details.


## Disable Webapps or REST API

By default Camunda BPM Run launches with the webapps and REST API modules. If you want only one of them enabled, execute the start script with a command-line interface with a `--webapps` or `--rest` property to enable the specific module.


## Choose between default and production configuration

Camunda BPM Run ships with two different configuration files which are both located in the `configuration` folder. 

* The `default.yml` configuration only contains necessary configuration like the H2 database, a demo user and [CORS](#cross-origin-resource-sharing) for REST calls from a client application.
* The `production.yml` configuration is intended to provide the recommended properties according to the [Security Instructions]({{< ref "/user-guide/security.md" >}}). When using Camunda BPM Run in a production environment, make sure to base your custom configuration on this one and carefully read through the security instructions.

By default Run launches with the `default.yml` configuration. To enable the `production.yml` configuration, execute the start script, through a command-line interface, with the `--production` property.


## Connect to a Database

Camunda BPM Run is pre-configured to use a file-based H2 database for testing. The database schema and all required tables are automatically created when the engine starts up for the first time. If you want to use a custom standalone database, follow these steps:

1. Make sure your database is among the [supported database systems]({{< ref "/introduction/supported-environments.md#supported-database-products" >}}).
1. Create a database schema for the Camunda BPM platform yourself.
1. Execute the SQL DDL scripts which create all required tables and default indices. The scripts can be found in the `configuration/sql/create` folder.
1. Drop a JDBC driver jar for your database system in the `configuration/userlib` folder.
1. Add the JDBC URL and login credentials to the configuration file like described [below](#database).
1. Restart Camunda BPM Run


## Deploy BPMN Models

In the unpacked distro, you will find a `resources` folder. All files (including BPMN, DMN, CMMN, form, and script files) will be deployed when you start Camunda BPM Run.

Deployments via the [REST API]({{< ref "/reference/rest/deployment/post-deployment.md" >}}) are still possible.


## Automatic License Pickup

If you downloaded the enterprise version of Camunda BPM Run, you will need a license key to enable the enterprise 
features. Please see the [dedicated License section]({{< ref "/user-guide/license-use.md#with-the-camunda-spring-boot-starter-camunda-run" >}}) 
of the docs, to learn more.


# Configure Camunda BPM Run

Just like all the other distros, you can tailor Camunda BPM Run to your needs. To do this, you only have to edit one of the [configuration files](#choose-between-default-and-production-configuration) that you can find in the configuration folder.

{{< note title="Note:" class="info" >}}
Camunda BPM Run is based on the [Camunda Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter). 
All [configuration properties]({{< ref "/user-guide/spring-boot-integration/configuration.md#camunda-engine-properties" >}}) from the camunda-spring-boot-starter are available to customize Camunda BPM Run.
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
      <td>Origins that are allowed to make CORS requests. Multiple origins can be separated with commas. To support both HTTP authentication and CORS, <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials"><code>allowed-origins</code> must not be <code>*</code></a>. To allow Camunda Modeler to deploy with authentication, including <code>file://</code> in the allowed origins.</td>
    <td><code>*</code> (all origins, including <code>file://</code>)</td>
  </tr>
</table>


## LDAP Identity Service

Camunda BPM can manage users and authorizations on its own, but if you want to use an existing LDAP authentication database you can enable the [LDAP Identity Service Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}})
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


## HTTPS

Camunda BPM Run supports HTTPS over SSL. To enable it, you will need a valid SSL certificate signed by a trusted provider and stored in a key store file (either .jks or .p12).
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
After starting Camunda BPM Run, you can access the webapps via https://localhost:8443/camunda/app/ and the REST API via https://localhost:8443/engine-rest/.

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

Camunda BPM provides fine-grained and customizable logging. An overview of the available logging categories can be found in the [Logging User Guide]({{< ref "/user-guide/logging.md#process-engine" >}}).
To configure the logging behavior in Camunda BPM Run, customize your configuration file with the following properties.

For more information on logging configuration visit the [Spring Boot Logging Guide](https://howtodoinjava.com/spring-boot2/logging/configure-logging-application-yml/).

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
      <td><code>.file</code></td>
      <td>Specify a log file location. (e.g. <code>logs/camunda-bpm-run-log.txt</code>)</td>
      <td><code>-</code></td>
  </tr>
</table>
