---

title: 'Camunda Platform RPA Bridge'
weight: 300

menu:
  main:
    identifier: "camunda-bpm-rpa-bridge"
    parent: "user-guide"

---

The Camunda RPA bridge is a standalone application that allows to call RPA (robotic process automation) bots from BPMN models deployed to a Camunda engine. RPA bots can be orchestrated as External Tasks using the Camunda Modeler and Cawemo.

For detailed instructions on how to connect your first RPA bot to a BPMN model (using Cawemo and the Camunda Modeler) and execute it from a running process instance using the Camunda engine, head over to our [installation guide]({{< ref "/installation/camunda-bpm-rpa-bridge.md" >}})

{{< enterprise >}}
  Please note that the RPA bridge is only available as enterprise edition.
{{< /enterprise >}}

# The Basics

The Camunda RPA bridge serves as a connector between Camunda (BPMN) on the one side and UiPath (RPA) on the other side. Processes running inside the Camunda engine can define external tasks that are marked as RPA tasks.

The bridge extends the regular [Java External Task Client](https://github.com/camunda/camunda-external-task-client-java), fetches and locks the RPA tasks and starts a job in UiPath. Once the job is done, UiPath will notify a webhook in the bridge about the job result and state (Success/Failure). Alternatively, a polling mechanism requesting status updates from UiPath can be configured. Either way, the bridge will complete the previously locked external task and pass any result variables received from UiPath along to the Camunda engine.

# Prerequisites and Supported Environments
To execute RPA bots from Camunda you will need:

* A [UiPath Orchestrator](https://www.uipath.com/product/orchestrator) instance, either
   * On-Premises v2019 or v2020.4 or 
   * Automation Cloud
* Camunda Platform 7.14 Enterprise Edition or later
* Java 8 or later installed on the machine that runs the Camunda RPA bridge

To design a BPMN model that connects to one or more RPA bots through the bridge, the following tools are very helpful (but not required):

* Cawemo 1.4 or later (to create and distribute worker catalogs)
* Camunda Modeler 4.2 or later (to apply the worker catalog to your process model)

# Camunda Platform RPA Bridge configuration
The bridge is configurable through the `application.yml` file that is included in the provided archive.
Properties marked with a `'*'` are required to be filled before starting the bridge.

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

## Configure Logging

The bridge logs basic information on log level `INFO`. Technical exceptions and erroneous states are logged on level `WARN` 
accompanied by the business context (e.g. exception while starting a job at the RPA vendor or while handling a response from it).
As the bridge is based on Spring Boot, you can consult the [official documentation](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-logging) for further information on logging configurations.

### Logging Categories

In order to also log the bridge's interactions with external systems, you can set the log level of the defined loggers to `DEBUG` by adding the following to the configuration for every logger you want to change, 
replacing `'<Logger>'` with a logger from the list. Please note that loggers work hierarchically, meaning that configuring `org.camunda.bpm.rpa.bridge` with level `DEBUG` will log statements of logger `org.camunda.bpm.rpa.bridge.rpa.uipath` in `DEBUG` well.

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
</table>

### Log to file

By default, all log output goes to the console. If you would like to log to a file `my.log`, add the following line to the configuration

```yaml
logging.file.name: my.log
```

Please consult the [official Spring Boot documentation](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-logging-file-output) for further options.

# Set up an RPA Task

The RPA bridge is a regular Java external task client and RPA tasks are [external tasks]({{< ref "/user-guide/process-engine/external-tasks.md" >}}) with specific settings.

The bridge listens for tasks with the defined topics. If a process instance reaches an external task with one of these topics, the bridge will be able to fetch and lock them. Once a task is locked, the bridge will try to forward it to your installation of UiPath which will take care of executing the associated robots.

## Map a Task to an RPA Bot

To tell the bridge for which RPA process a bot should be started, it is necessary to add an [extension property]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#properties" >}}) with the name `bot` and a value equal to the package name of the released process in UiPath.


### Using Cawemo and the Camunda Modeler

With Cawemo you can create worker catalogs that define all properties for RPA tasks. Those can be used to populate existing BPMN models with the correct properties and extensions using the Camunda Modeler.

### Manual Setup using the Camunda Modeler

The extension property can be set using the Camunda Modeler (or any other BPMN or XML editor). In the Modeler, select the task and switch to the Extensions tab in the properties panel. Add a property named `bot` with the value equal to the name of the process you want to start in UiPath.

This example shows an external task that will trigger the UiPath process `UiPathProcessName` and is published in the `RPA` external task topic.

```xml
<bpmn:serviceTask id="myRPAtask" name="Launch the Robots" camunda:type="external" camunda:topic="RPA">
  <bpmn:extensionElements>
    <camunda:properties>
      <camunda:property name="bot" value="UiPathProcessName" />
    </camunda:properties>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```
## Variables

You can send/receive variables to/from an RPA bot by using [input and output mapping]({{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) on the external task.
All local variables of the external task will be made available to the RPA bot. In return, all variables that the RPA bot exports will be returned back to the task and should be mapped to a higher scope via output mapping if the rest of the process should have access to them.
Make sure to define input variables in your RPA bot to access them.

This example shows an external task that uses input mapping to pass three variables to an RPA bot that runs the `PrintReceipt` process. If the bot returns a variable called `pdfStorage` it will be mapped to the task's parent scope using output mapping.
The bot might return more variables which will be ignored in this case.

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

## Error Handling

In the case that not everything works as expected and an RPA bot fails for any reason, you might want to react to the failure by throwing a BPMN error.
You can do that by adding the [camunda:errorEventDefinition]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#erroreventdefinition" >}}) extension element.

Compared to the `bpmn:errorEventDefinition`, the `camunda:errorEventDefinition` elements accept an additional `expression` attribute which supports any JUEL expression. Within the expression you have access to the `ExternalTaskEntity` object like shown in the example below. For more information about External Task error handling via `camunda:errorEventDefinition` have a look at the [External Tasks Guide]({{< ref "/user-guide/process-engine/external-tasks.md#error-event-definitions" >}}).

You can use this feature regardless of the outcome of the RPA bot. Even if the bot was executed successfully, you can still decide to throw a BPMN error. Also note, that
the RPA bots variables are available for mapping and error handling via `camunda:errorEventDefinition` as well even if the bot failed.

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

When connected to UiPath, the bridge will use the following API endpoints:

## Authentication:

* `https://account.uipath.com/oauth/token` - when using UiPath Automation Cloud
* `<ui-path-url>/api/account/authenticate` - when using UiPath on-premise (v2019 or v2020.4)

## Jobs:

 * `<ui-path-url>/Releases?$filter=ProcessKey eq 'processKey'` - find release for process
 * `<ui-path-url>/Jobs/UiPath.Server.Configuration.OData.StartJobs` - for starting RPA jobs
 * `<ui-path-url>/Jobs?$select=Key,State,Id,Info,OutputArguments&$filter=(<tracked-job-states-filter>) and (<job-filter>)` - find jobs in finished and failed states, only when polling is used to retrieve job status

## Requests from UiPath to Bridge:

### Webhook:

 * `<bridge-webhook-path>/webhook/event` - notify bridge about tracked job, only when webhook is used to retrieve job status

# Telemetry

At Camunda, we strive to offer excellent user experience at a high and stable level. On a strict opt-in basis, we are looking to collect environment and usage data to further improve the user experience for you. These insights help us to understand typical environment setups and product usage patterns and will be used to make informed product improvement decisions to your benefit.

Find more information on the [general telemetry introduction page]({{< ref "/introduction/telemetry.md" >}})

When enabled via including `org.camunda.bpm.rpa.enable-telemetry=true` in the [configuration file]({{< ref "/user-guide/camunda-bpm-rpa-bridge.md#enable-telemetry" >}}), the bridge will collect the following data and securely send them to a Camunda server.

## General Data

* A generated unique ID for every bridge instance
* The name of the product (i.e., Camunda Platform RPA Bridge)
* The version of the bridge (e.g., 1.0.0)
* The edition of the product (i.e., enterprise)
* The customer name, expiry date and enabled features as well as the raw license info

License key data does not contain any protected data like the signature.

## Metrics

* Number of started RPA bots
* Number of completed RPA bots
* Number of failed RPA bots

## Legal Note

Before you install a Camunda Platform Runtime version >= 7.14.0-alpha1 or activate the telemetry functionality, please make sure that you are authorized to take this step, and that the installation or activation of the [telemetry functionality]({{< ref "/user-guide/camunda-bpm-rpa-bridge.md#enable-telemetry" >}}) is not in conflict with any company-internal policies, compliance guidelines, any contractual or other provisions or obligations of your company.

Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.
