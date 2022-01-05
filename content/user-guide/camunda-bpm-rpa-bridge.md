---

title: 'Camunda Platform RPA Bridge'
weight: 300

menu:
  main:
    identifier: "camunda-bpm-rpa-bridge"
    parent: "user-guide"

---

The Camunda RPA Bridge is a standalone application that allows calling RPA (robotic process automation) bots from BPMN models deployed to a Camunda engine. RPA bots can be orchestrated as External Tasks using the Camunda Modeler and Cawemo.

For detailed instructions on how to connect your first RPA bot to a BPMN model (using Cawemo and the Camunda Modeler) and execute it from a running process instance using the Camunda engine, head over to our [installation guide]({{< ref "/installation/camunda-bpm-rpa-bridge.md" >}}) or the [Getting Started Guide](https://docs.camunda.org/get-started/rpa).

{{< enterprise >}}
  Please note that the RPA bridge is only available as enterprise edition.
{{< /enterprise >}}

# The Basics

## What is the Camunda Platform RPA Bridge?

The Camunda RPA Bridge serves as a connector between Camunda (BPMN) on the one side and a vendor for RPA bots on the other side. For an overview about what RPA vendors and which versions are supported, please consult the [Supported Environments]({{< ref "#prerequisites-and-supported-environments" >}}) section.

Processes running inside the Camunda engine can define external tasks marked as RPA tasks. The bridge extends the regular [Java External Task Client](https://github.com/camunda/camunda-bpm-platform/clients/java), fetches, and locks the RPA tasks, and starts an RPA bot in one of the [supported RPA vendors]({{< ref "#prerequisites-and-supported-environments" >}}). Once the bot is executed, the Camunda RPA Bridge fetches the result (output variables) and state (success/failure) of the bot. It completes the previously locked external task while passing any result variables received from the bot to the Camunda engine.

## How to use this Guide?

The bridge is a powerful tool that can work in many scenarios and connect to different RPA solutions. This guide aims to give a broad overview over the capabilities of the Camunda RPA bridge while also providing detailed information for setups with each RPA vendor.

For each topic this guide covers, you will find general information that apply to all applications of the RPA Bridge. Details for use with a specific RPA vendor or environment are located in sub-sections following the general introduction.

# Prerequisites and Supported Environments
To execute RPA bots from Camunda, you will need:

* Camunda Platform 7.14 Enterprise Edition or later
* Java 8 or later installed on the machine that runs the Camunda RPA Bridge

[UiPath Orchestrator](https://www.uipath.com/product/orchestrator) users can use the bridge with one of the following versions:

* On-Premises v2019 or v2020.4
* Automation Cloud

In terms of [Automation Anywhere](https://www.automationanywhere.com/products/automation-360), the bridge integrates with:

* Automation 360 (formerly A2019)

To design a BPMN model that connects to one or more RPA bots through the bridge, the following tools are beneficial (but not required):

* Cawemo 1.4 or later (to create and distribute worker catalogs) with [Cloud Connect Plugin](https://downloads.camunda.cloud/enterprise-release/cawemo/cloud-connect-modeler-plugin) 3.0.0 or later
* [Camunda Modeler](https://camunda.com/download/modeler) 4.7 or later (to apply the worker catalog to your process model and add BPMN error capabilities to your RPA tasks)

# Camunda Platform RPA Bridge configuration
The bridge is configurable through the `application.yml` file that is included in the provided archive.
Properties marked with a `'*'` are mandatory and can not be empty when starting the bridge.

## Configure Basic Properties

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>org.camunda.bpm.rpa</code></td>
      <td><code>license-file</code></td>
      <td>Provides a URL to your Camunda license file</td>
      <td>By default, the license key will be loaded:
        <ol>
          <li>from the URL provided via this property (if present)</li>
          <li>from the file with the name <code>camunda-license.txt</code> from the classpath (if present)</li>
          <li>from path <i>${user.home}/.camunda/license.txt</i> (if present)</li>
        </ol>
        The license must be exactly in the format as we sent it to you including the header and footer line.
      </td>
  </tr>
    <tr id="enable-telemetry">
      <td><code>enable-telemetry</code></td>
      <td>Enable sending usage metrics and general statistics to Camunda. For more information see the <a href="#telemetry">Telemetry section</a> below.</td>
      <td>false</td>
  </tr>
  <tr id="date-format">
    <td><code>date-format</code></td>
    <td><p>If the Camunda Platform engine uses <a href="/reference/rest/overview/date-format/">a custom date format</a>, you should configure the same format for the Camunda RPA Bridge. This ensures the bridge can read date fields acquired from the Camunda Platform REST API correctly.</td>
    <td>The default for this property is inherited from the Java External Task Client and is the same as the default date format in the Camunda Platform.</p>
    <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code></td>
  </tr>
</table>

## Configure Access to the Camunda API

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>org.camunda.bpm.rpa.camunda-api</code></td>
      <td><code>url*</code></td>
      <td>The URL to the Camunda REST API (e.g. `http://localhost:8080/engine-rest`)</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>authentication.type</code></td>
      <td>The type of authentication to access the REST API (e.g. `basic`), only if your REST API is authenticated</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>authentication.username</code></td>
      <td>The username to authenticate against the REST API, only if your REST API is authenticated</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>authentication.password</code></td>
      <td>The password to authenticate against the REST API, only if your REST API is authenticated</td>
      <td>-</td>
  </tr>
</table>

## Configure Access to UiPath Orchestrator

### API

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>org.camunda.bpm.rpa.uipath-api</code></td>
      <td><code>topics*</code></td>
      <td>The topics on which the bridge will listen for RPA tasks.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>url*</code></td>
      <td>The URL to your UiPath Orchestrator instance.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>tenant-name*</code></td>
      <td>The name of the UiPath tenant. For Automation Cloud instances, this refers to the <code>Tenant Logical Name</code></td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>status-update-method*</code></td>
      <td>The job status update mechanism to use, can be either <code>webhook</code> or <code>polling</code>. Please note that further configuration can be necessary for either option as described in the respective configuration sections.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>account-name</code></td>
      <td>The name of the UiPath account. This is only necessary for Automation Cloud instances.</td>
      <td>-</td>
  </tr>
</table>

### Authentication

<table  class="table desc-table">
  <tr>
      <td rowspan="15"><code>org.camunda.bpm.rpa.uipath-api.authentication</code></td>
      <td><code>type*</code></td>
      <td>The type of UiPath Orchestrator to authenticate against, must be one of <code>on-premise</code> or <code>cloud</code>.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>auth-url*</code></td>
      <td>The URL used for authentication against the UiPath API.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>user*</code></td>
      <td>The <code>username</code>/<code>e-mail</code> (for On-Premises) or the <code>client-id</code> (for Automation Cloud) to use. This is only used for authentication.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>key*</code></td>
      <td>The <code>password</code> (for On-Premises) or <code>refresh-token</code>/<code>user-key</code> (for Automation Cloud) issued by UiPath. This is used to authenticate or refresh the authentication token when it expires.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>token-expiration</code></td>
      <td>Lifetime of the authentication token in minutes. The value of this property should match the configured lifetime of an authentication token acquired from UiPath.</td>
      <td>30 minutes (on-premise)<br/>1440 minutes/24 hours (cloud)</td>
  </tr>
</table>

### Webhook

<table class="table desc-table">
  <tr>
    <td rowspan="15"><code>org.camunda.bpm.rpa.uipath-api.webhook</code></td>
      <td><code>secret</code></td>
      <td>The secret used in your UiPath webhook configuration, only required if the <code>status-update-method</code> is set to <code>webhook</code></td>
      <td>-</td>
  </tr>
  <tr>
    <td>path</td>
    <td>Relative path of the webhook endpoint in your application.</td>
    <td>/webhook/event</td>
  </tr>
</table>

### Polling

<table class="table desc-table">
  <tr>
    <td rowspan="15"><code>org.camunda.bpm.rpa.uipath-api.polling</code></td>
      <td><code>rate-ms</code></td>
      <td>The rate in milliseconds to use for polling bot status updates.</td>
      <td>4000</td>
  </tr>
  <tr>
    <td>init-delay-ms</td>
    <td>The initial delay in milliseconds before polling for bot status updates starts after application startup.</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>poll-size</td>
    <td>The number of jobs to poll for in one request in order to not exceed the API request character limit.</td>
    <td>13</td>
  </tr>
</table>

## Configure Access to Automation Anywhere Control Room API

### API

<table class="table desc-table">
  <tr>
      <th>Prefix</th>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
  </tr>
  <tr>
      <td rowspan="15"><code>org.camunda.bpm.rpa.automation-anywhere-api</code></td>
      <td><code>topics*</code></td>
      <td>The topics on which the bridge will listen for RPA tasks.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>url*</code></td>
      <td>The URL to your Automation Anywhere Control Room instance.</td>
      <td>-</td>
  </tr>
</table>

### Authentication

<table  class="table desc-table">
  <tr>
      <td rowspan="15"><code>org.camunda.bpm.rpa.automation-anywhere-api.authentication</code></td>
      <td><code>user*</code></td>
      <td>The <code>username</code> used for authentication against Automation Anywhere. This user is also used to start the bots (i.e. it should have bot runner permissions).</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>password</code></td>
      <td>The <code>password</code> for the user used for authentication against Automation Anywhere. Note that either <code>password</code> or <code>api-key</code> is mandatory.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>api-key</code></td>
      <td>The <code>api-key</code> for the user used for authentication against Automation Anywhere. Note that either <code>password</code> or <code>api-key</code> is mandatory.</td>
      <td>-</td>
  </tr>
  <tr>
      <td><code>token-expiration</code></td>
      <td>Lifetime of the authentication token in minutes. The value of this property should match the configured lifetime of an authentication token acquired from Automation Anywhere.</td>
      <td>20 minutes</td>
  </tr>
</table>

### Polling

<table class="table desc-table">
  <tr>
    <td rowspan="15"><code>org.camunda.bpm.rpa.automation-anywhere-api.polling</code></td>
      <td><code>rate-ms</code></td>
      <td>The rate in milliseconds to use for polling bot status updates.</td>
      <td>4000</td>
  </tr>
  <tr>
    <td>init-delay-ms</td>
    <td>The initial delay in milliseconds before polling for bot status updates starts after application startup.</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>poll-size</td>
    <td>The number of bots to poll for in one request in order to not exceed the API request limit.</td>
    <td>2000</td>
  </tr>
</table>

## Configure Logging

The bridge logs basic information on log level `INFO`. Technical exceptions and erroneous states are logged on level `WARN` 
accompanied by the business context (e.g., exception while starting an RPA bot or handling a response from the RPA vendor).
As the bridge is based on Spring Boot, you can consult the [official documentation](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-logging) for further information on logging configurations.

### Logging Categories

To log the bridge's interactions with external systems, you can set the log level of the defined loggers to `DEBUG` by adding the following to the configuration for every logger you want to change, 
replacing `'<Logger>'` with a logger from the list. Please note that loggers work hierarchically, meaning that configuring `org.camunda.bpm.rpa.bridge` with level `DEBUG` will log statements of logger `org.camunda.bpm.rpa.bridge.rpa.uipath` in `DEBUG` as well.

```yaml
...
logging.level.<Logger>: DEBUG
...
```

<table class="table table-striped">
  <tr>
    <th>Logger</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge</code></td>
    <td>Logs details for all interactions with all external systems (i.e. RPA vendor and Camunda Platform Runtime).</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.externaltask</code></td>
    <td>Logs details for all interactions with the Camunda Platform Runtime, specifically the locking, unlocking, completing and failing of External Tasks.</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.rpa</code></td>
    <td>Logs details for all interactions with all possible RPA vendors, including outgoing and incoming requests as well as responses for outgoing requests.</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.rpa.RequestHandler</code></td>
    <td>Logs details for all responses for outgoing requests to RPA vendors.</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.rpa.uipath</code></td>
    <td>Logs details for all interactions with UiPath, specifically outgoing and incoming requests. Note that responses to outgoing request are NOT logged here. Please additionally configure the <code>org.camunda.bpm.rpa.bridge.rpa.RequestHandler</code> for that purpose</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.rpa.uipath.auth</code></td>
    <td>Logs details for all authentication interactions with UiPath, specifically outgoing requests. Note that responses to outgoing request are NOT logged here.Please additionally configure the <code>org.camunda.bpm.rpa.bridge.rpa.RequestHandler</code> for that purpose</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.rpa.aai</code></td>
    <td>Logs details for all interactions with Automation Anywhere, specifically outgoing requests. Note that responses to outgoing request are NOT logged here. Please additionally configure the <code>org.camunda.bpm.rpa.bridge.rpa.RequestHandler</code> for that purpose</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.rpa.bridge.rpa.aai.auth</code></td>
    <td>Logs details for all authentication interactions with Automation Anywhere, specifically outgoing requests. Note that responses to outgoing request are NOT logged here.Please additionally configure the <code>org.camunda.bpm.rpa.bridge.rpa.RequestHandler</code> for that purpose</td>
  </tr>
</table>

### Log to file

By default, all log output goes to the console. If you would like to log to a file `my.log`, add the following line to the configuration

```yaml
logging.file.name: my.log
```

Please consult the [official Spring Boot documentation](https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/htmlsingle/#boot-features-logging-file-output) for further options.

# Set up an RPA Task

The RPA bridge is a regular Java external task client and RPA tasks are [external tasks]({{< ref "/user-guide/process-engine/external-tasks.md" >}}) with specific settings.

The bridge listens for tasks with the topics configured in the `application.yml` file. When a process instance reaches an external task with one of these topics, the bridge will fetch and lock them. Once a task is locked, the bridge forwards it to the configured RPA vendor, which will take care of executing the associated robots.

## Map a Task to an RPA Bot

It is necessary to add an [extension property]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#properties" >}}) with the name `bot` and a value that references the bot inside the RPA platform to tell the bridge for which RPA process a bot should be started. The different vendors have different ways of referencing RPA bots. Find the details in the table below.

<table class="table table-striped">
  <tr>
    <th>RPA vendor name</th>
    <th>Identifier for RPA bot</th>
  </tr>
  <tr>
    <td>UiPath</td>
    <td>package name of the released process in UiPath</td>
  </tr>
  <tr>
    <td>Automation Anywhere</td>
    <td>name of the RPA bot as assigned when creating the RPA bot</td>
  </tr>
</table>

### Using Cawemo and the Camunda Modeler

With Cawemo you can create worker catalogs that define all properties for RPA tasks. Those can be used to populate existing BPMN models with the correct properties and extensions using the Camunda Modeler. Detailed instructions on how to create catalog projects and how to sync them with the Camunda Modeler can be found in the [RPA Getting Started Guide](https://docs.camunda.org/get-started/rpa).

### Manual Setup using the Camunda Modeler

Users can set the extension property using the Camunda Modeler (or any other BPMN or XML editor). In the Modeler, select the task and switch to the Extensions tab in the properties panel. Add a property named `bot` with a value equal to the bot identifier of the configured RPA vendor.

Alternatively, you can use any text editor to create a BPMN file that contains the following XML structure.
This example shows an external task that will trigger the RPA bot `myRobot` and is published in the `RPA` external task topic.

```xml
<bpmn:serviceTask id="myRPAtask" name="Launch the Robots" camunda:type="external" camunda:topic="RPA">
  <bpmn:extensionElements>
    <camunda:properties>
      <camunda:property name="bot" value="myRobot" />
    </camunda:properties>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```
## Variables

You can send/receive variables to/from an RPA bot by using [input and output mapping]({{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) on the external task.
All local variables of the external task will be made available to the RPA bot. In return, all variables that the RPA bot exports will be returned back to the task and should be mapped to a higher scope via output mapping (if the rest of the process should have access to them).
Make sure to define input variables in your RPA bot to access them.

This example shows an external task that uses input mapping to pass three variables to an RPA bot called `PrintReceipt`. If the bot returns a variable called `pdfStorage` it will be mapped to the task's parent scope using output mapping.
The bot might return more variables that are ignored in this case.

```xml
<bpmn:serviceTask id="myRPAtask" name="GenerateReceipt" camunda:type="external" camunda:topic="RPA">
  <bpmn:extensionElements>
    <camunda:inputOutput>
       <camunda:inputParameter name="productName">${product}</camunda:inputParameter>
       <camunda:inputParameter name="count">${count}</camunda:inputParameter>
       <camunda:inputParameter name="price">${price}</camunda:inputParameter>
       <camunda:outputParameter name="pdfStorage">${pdfStorage}</camunda:outputParameter>
      </camunda:inputOutput>
    <camunda:properties>
      <camunda:property name="bot" value="PrintReceipt" />
    </camunda:properties>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

It is important to keep in mind that the Camunda engine does not have any control over the RPA bot execution. An RPA bot might return one set of variables if it succeeds and a different set in case of failure.
If you configure output mapping for a variable that returns from the bot you are relying on that bot to always return this variable. If the bot does not return the correct variable, the output mapping will fail with an exception.
To prevent that, you can enable an engine configuration flag called [skipOutputMappingOnCanceledActivities]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#skipOutputMappingOnCanceledActivities" >}}). The flag will cause all activities (not only RPA tasks) to skip the output mapping if they are canceled.

### Variable Conversion with UiPath

UiPath supports basic variable types like String (text), Boolean (true/false), Number, and Date/Time, as well as more complex structures like Arrays and Data Tables.

The RPA bridge can convert primitive types (i.e., String, Boolean, Number) and Date/Time variables for Cockpit to typed variables. The complex types are passed as received from UiPath (i.e., JSON String representation).

For more information, please consult the UiPath [documentation page](https://docs.uipath.com/studio/docs/types-of-variables) about the different variable types.

### Variable Conversion with Automation Anywhere

Besides primitive variable types like String (text), Boolean (true/false), and Number, Automation Anywhere supports more complex types like DateTime, List, Dictionary, Table, and Record. Additionally, there are custom types like Credential, File, Form, Session, and Window.

The RPA Bridge can convert primitive types (i.e., String, Boolean, Number) and DateTime variables for Cockpit to typed variables. The complex types are passed as received from Automation Anywhere (i.e., JSON nodes).

Please consult the Automation Anywhere [documentation page](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/aae-client/bot-creator/using-variables/cloud-user-local-variables.html) for more information about the different variable types.

## Error Handling

In case an RPA bot fails for any reason, you might want to react to the failure by throwing a [BPMN error]({{< ref "/reference/bpmn20/events/error-events.md" >}}).
You can do that by adding the [camunda:errorEventDefinition]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#erroreventdefinition" >}}) extension element to a service task.

Compared to the `bpmn:errorEventDefinition`, the `camunda:errorEventDefinition` elements accept an additional `expression` attribute which supports any JUEL expression. Within the expression you have access to the `ExternalTaskEntity` object like shown in the example below. For more information about External Task error handling via `camunda:errorEventDefinition` have a look at the [External Tasks Guide]({{< ref "/user-guide/process-engine/external-tasks.md#error-event-definitions" >}}).

You can use this feature regardless of the outcome of the RPA bot. Even if the bot was executed successfully, you could still decide to throw a BPMN error. Also note, that
the RPA bot's variables are available for mapping and error handling via `camunda:errorEventDefinition`, even if the bot failed.

### Examples:

**How do I access the External Task object and match an error message coming from my bot?**

```xml
<bpmn:serviceTask id="myRPAtask" name="GenerateReceipt" camunda:type="external" camunda:topic="RPA">
  <bpmn:extensionElements>
    <camunda:errorEventDefinition id="myErrorEventDefinition" errorRef="myError" expression="${externalTask.getErrorDetails() == 'myErrorMessage'}" />
    <camunda:properties>
      <camunda:property name="bot" value="PrintReceipt" />
    </camunda:properties>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

**How can I match a substring?**

Note that if multiple errorEventDefinitions are provided, the first one that evaluates to true will trigger the referenced error. In this example `myErrorEventDefinition1` and `myErrorEventDefinition2` will trigger the same error while `myErrorEventDefinition3` will trigger a different one:

```xml
<bpmn:serviceTask id="myRPAtask" name="GenerateReceipt" camunda:type="external" camunda:topic="RPA">
  <bpmn:extensionElements>
    <camunda:errorEventDefinition id="myErrorEventDefinition1" errorRef="myError" expression="${myStringVar.startsWith('foo'}" />
    <camunda:errorEventDefinition id="myErrorEventDefinition2" errorRef="myError" expression="${myStringVar.endsWith('bar'}" />
    <camunda:errorEventDefinition id="myErrorEventDefinition3" errorRef="myError2" expression="${myStringVar.contains('baz'}" />
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

# API Usage

The Camunda RPA Bridge connects to an RPA vendor's REST API via HTTP requests. The endpoints that are used by the bridge for each RPA vendor are listed below.

## UiPath

When connected to UiPath, the bridge will use the following API endpoints. For more information, visit the UiPath Orchestrator API [Postman collection](https://postman.uipath.rocks/?version=latest) page.

### Authentication:

* `https://account.uipath.com/oauth/token` - when using UiPath Automation Cloud
* `<ui-path-url>/api/account/authenticate` - when using UiPath on-premise (v2019 or v2020.4)

### Jobs:

 * `<ui-path-url>/Releases?$filter=ProcessKey eq 'processKey'` - find release for process
 * `<ui-path-url>/Jobs/UiPath.Server.Configuration.OData.StartJobs` - for starting RPA jobs
 * `<ui-path-url>/Jobs?$select=Key,State,Id,Info,OutputArguments&$filter=(<tracked-job-states-filter>) and (<job-filter>)` - find jobs in finished and failed states, only when polling is used to retrieve job status

### Requests from UiPath to Bridge:

#### Webhook:

 * `<bridge-webhook-path>/webhook/event` - notify bridge about tracked job, only when webhook is used to retrieve job status

## Automation Anywhere

When connected to Automation Anywhere, the bridge will use the following API endpoints. For more information, visit the [Swagger page](https://community2.cloud-2.automationanywhere.digital/swagger/) for the Automation Anywhere Control Room API.

### Authentication

 * `<aai-path-url>/v1/authentication` - for authentication via username/password or username/apikey and for refreshing the authentication token

### Bots

 * `<aai-path-url>/v2/repository/file/list` - find the id of the bot to be started
 * `<aai-path-url>/v2/activity/list` - get status updates for started bots
 * `<aai-path-url>/v3/automations/deploy` - deploy (start) an RPA bot

# Telemetry

At Camunda, we strive to offer an excellent user experience at a high and stable level. On a strict opt-in basis, we are looking to collect environment and usage data to further improve the user experience for you. These insights help us to understand typical environment setups and product usage patterns and will be used to make informed product improvement decisions to your benefit.

Find more information on the [general telemetry introduction page]({{< ref "/introduction/telemetry.md" >}})

When enabled via including `org.camunda.bpm.rpa.enable-telemetry=true` in the [configuration file]({{< ref "/user-guide/camunda-bpm-rpa-bridge.md#enable-telemetry" >}}), the bridge will collect the following data and securely send them to a Camunda server.

## General Data

* A generated unique ID for every bridge instance
* The name of the product (i.e., Camunda Platform RPA Bridge)
* The version of the bridge (e.g., 1.0.0)
* The edition of the product (i.e., enterprise)
* The name and version of the configured RPA solution
* The customer name, the expiration date of the license, enabled features as well as the raw license info

License key data does not contain any protected data like the signature.

## Metrics

* Number of started RPA bots
* Number of completed RPA bots
* Number of failed RPA bots

## Legal Note

Before you install a Camunda Platform Runtime version >= 7.14.0-alpha1 or activate the telemetry functionality, please make sure that you are authorized to take this step and that the installation or activation of the [telemetry functionality]({{< ref "/user-guide/camunda-bpm-rpa-bridge.md#enable-telemetry" >}}) is not in conflict with any company-internal policies, compliance guidelines, any contractual or other provisions or obligations of your company.

Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.
