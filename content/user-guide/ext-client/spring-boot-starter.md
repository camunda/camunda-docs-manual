---

title: 'External Task Client Spring Boot Starter'
weight: 200

menu:
  main:
    name: "Spring Boot Starter"
    identifier: "external-task-client-spring-boot-starter"
    parent: "external-task-client"

---

Camunda provides a Spring Boot Starter for the External Task Client. This allows you to easily add 
the External Task Client to your Spring Boot application by adding the following Maven dependency to 
your `pom.xml` file:
```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-external-task-client</artifactId>
  <version>{{< minor-version >}}.0</version>
</dependency>
```

Please check out our [External Task Client Spring Boot Starter Examples](https://github.com/camunda/camunda-bpm-examples/tree/{{<minor-version>}}#external-task-client-spring-boot).

The Client can subscribe to one or more topic names that are defined in your BPMN process model.
When the execution waits in an External Task, the Client executes your custom business logic. 
For instance, the customer's credit score is checked, and if successful, the External Task 
can be marked as completed and the execution proceeds.

# Requirements

External Task Client Spring Boot Starter requires Java 17.

## Topic Subscription

The interface which allows implementing the custom business logic and interacting with the Engine is 
called `ExternalTaskHandler`. A subscription is identified by a topic name and configured with a 
reference to the `ExternalTaskHandler` bean.

You can subscribe the Client to the topic name `creditScoreChecker` by defining a bean with the return 
type `ExternalTaskHandler` and annotate this bean with:

```java
@ExternalTaskSubscription("creditScoreChecker")
```

The annotation requires at least the topic name. However, you can apply more configuration options by 
either referencing the topic name in your `application.yml` file:

```yaml
camunda.bpm.client:
  base-url: http://localhost:8080/engine-rest
  subscriptions:
    creditScoreChecker:
        process-definition-key: loan_process
        include-extension-properties: true
        variable-names: defaultScore
```

Or, by defining configuration attributes in the annotation:

```java
@ExternalTaskSubscription(
  topicName = "creditScoreChecker",
  processDefinitionKey = "loan_process",
  includeExtensionProperties = true,
  variableNames = "defaultScore"
)
```

Please find the complete list of attributes in the 
{{< javadocref page="org/camunda/bpm/client/spring/annotation/ExternalTaskSubscription.html" text="Javadocs" >}}.

**Please Note:** A property defined in the `application.yml` file always overrides the respective attribute defined programmatically via annotation.

### Handler Configuration Example

Please consider the following complete handler bean example:

```java
@Configuration
@ExternalTaskSubscription("creditScoreChecker")
public class CreditScoreCheckerHandler implements ExternalTaskHandler {

  @Override
  public void execute(ExternalTask externalTask, 
                      ExternalTaskService externalTaskService) {
    // add your business logic here
  }

}
```

If you want to define multiple handler beans within one configuration class, you can do it as follows:

```java
@Configuration
public class HandlerConfiguration {

  @Bean
  @ExternalTaskSubscription("creditScoreChecker")
  public ExternalTaskHandler creditScoreCheckerHandler() {
    return (externalTask, externalTaskService) -> {
      // add your business logic here
      externalTaskService.complete(externalTask);
    };
  }

  @Bean
  @ExternalTaskSubscription("loanGranter")
  public ExternalTaskHandler loanGranterHandler() {
    return (externalTask, externalTaskService) -> {
      // add your business logic here
      externalTaskService.complete(externalTask);
    };
  }

}
```

### Open/close a Topic Subscription

When not further configured, a topic subscription is automatically opened when the Spring Boot
application starts, meaning the Client starts immediately to fetch External Tasks related to the topic name.

There might be situations in which a topic subscription should not be opened immediately when the
application starts. You can control this via the [`auto-open`](/#auto-open) flag.

The interface `SpringTopicSubscription` allows you to open or close a topic programmatically as soon
as the subscription has been initialized. The initialization process is triggered as soon as the 
application is started.

When the subscription has been initialized, a `SubscriptionInitializedEvent` is emitted, and the 
topic subscription can be opened or closed:

```java
@Configuration
public class SubscriptionInitializedListener 
    implements ApplicationListener<SubscriptionInitializedEvent> {

  @Override
  public void onApplicationEvent(SubscriptionInitializedEvent event) {

    SpringTopicSubscription topicSubscription = event.getSource();

    String topicName = topicSubscription.getTopicName();
    boolean isOpen = topicSubscription.isOpen();
    if ("creditScoreChecker".equals(topicName)) {

      if(!isOpen) {
        // Start fetching for External Tasks
        topicSubscription.open();

      } else {
        // Stop fetching for External Tasks
        topicSubscription.close();

      }
    }
  }

}
```

## Configuration

### `application.yml` file

The central configuration point is the `application.yml` file.

#### Client Bootstrapping

Please make sure to configure the properties together with the prefix: `camunda.bpm.client`

An example configuration could look as follows:

```yaml
camunda.bpm.client:
  base-url: http://localhost:8080/engine-rest
  worker-id: spring-boot-worker
  basic-auth:
    username: admin
    password: admin
```

Available properties:

<table class="table desc-table">
  <thead>
    <tr>
      <th style="width: 20%;">Property name</th>
      <th style="width: 60%;">Description</th>
      <th style="width: 20%;">Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base-url</code></td>
      <td>
        <strong>Mandatory:</strong> Base url of the Camunda 7 Runtime
        REST API.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>worker-id</code></td>
      <td>
        A custom worker id the Workflow Engine is aware of. <br>
        <strong>Note:</strong> make sure to choose a unique worker id.
      </td>
      <td>hostname + 128 bit UUID</td>
    </tr>
    <tr>
      <td><code>max-tasks</code></td>
      <td>
        Specifies the maximum number of tasks that can be fetched within one
        request.
      </td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><code>use-priority</code></td>
      <td>
        Specifies whether tasks should be fetched based on their priority or
        arbitrarily.
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>use-create-time</code></td>
      <td>
        Specifies whether tasks should be fetched based on their create time in descending order. Use this property in disjunction with order-by-create-time property or a SpringExternalTaskClientException will be thrown.
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>order-by-create-time</code></td>
      <td>
        Specifies whether tasks should be fetched based on their createTime with the given configured order. It can be either "asc" or "desc". Use this property in disjunction with use-create-time property or a SpringExternalTaskClientException will be thrown.
      </td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><code>async-response-timeout</code></td>
      <td>
        Asynchronous response (long polling) is enabled if a timeout is given.
        Specifies the maximum waiting time for the response of fetched and
        locked External Tasks. The response is performed immediately if
        External Tasks are available at the moment of the request.
      </td>
      <td>
        <code>null</code>
      </td>
    </tr>
    <tr>
      <td><code>disable-auto-fetching</code></td>
      <td>
        Disables immediate fetching for external tasks after bootstrapping the
        Client. To start fetching <code>ExternalTaskClient#start()</code> must
        be called.
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>disable-backoff-strategy</code></td>
      <td>
        Disables the client-side backoff strategy. When set to
        <code>true</code>, a <code>BackoffStrategy</code> bean is ignored.<br /><br />
        <strong>Heads-up:</strong> Please bear in mind that disabling the
        client-side backoff can lead to heavy load situations on the engine side. To
        avoid this, please specify an appropriate <code>async-response-timeout</code>.
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>lock-duration</code></td>
      <td>
        Specifies for how many milliseconds an External Task is locked. Must be
        greater than zero. It is overridden by the lock duration configured on a
        topic subscription
      </td>
      <td><code>20,000</code></td>
    </tr>
    <tr>
      <td><code>date-format</code></td>
      <td>Specifies the date format to de-/serialize date variables.</td>
      <td><code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code></td>
    </tr>
    <tr>
      <td><code>default-serialization-format</code></td>
      <td>
        Specifies the serialization format that is used to serialize objects
        when no specific format is requested.
      </td>
      <td><code>application/json</code></td>
    </tr>
    <tr>
      <td><code>basic-auth.username</code></td>
      <td>
        Specifies the username credential of the REST API to be authenticated with. 
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>basic-auth.password</code></td>
      <td>
        Specifies the password credential of the REST API to be authenticated with.
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

#### Topic Subscription

The properties for topic subscriptions go under: `camunda.bpm.client.subscriptions`

The configuration properties can be applied for each topic name as follows:

```yaml
camunda.bpm.client:
  # ADD CLIENT CONFIGURATION HERE
  subscriptions:
    creditScoreChecker:
        process-definition-key: loan_process
        include-extension-properties: true
        variable-names: defaultScore
    loanGranter:
        process-definition-key: loan_process
```

Available properties:

<table class="table desc-table">
  <thead>
    <tr>
      <th style="width: 20%;">Property name</th>
      <th style="width: 60%;">Description</th>
      <th style="width: 20%;">Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>${TOPIC_NAME}</code></td>
      <td>
        The Service Task's topic name in the BPMN process model the Client
        subscribes to.
      </td>
      <td></td>
    </tr>
    <tr id="auto-open">
      <td><code>auto-open</code></td>
      <td>
        When <code>false</code>, topic subscription can be opened after
        the application starts calling
        <code>SpringTopicSubscription#open()</code>. Otherwise, the Client
        immediately starts to fetch for External Tasks.
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>lock-duration</code></td>
      <td>
        Specifies for how many milliseconds an External Task is locked. Must be
        greater than zero. Overrides the lock duration configured on
        bootstrapping the Client.
      </td>
      <td><code>20,000</code></td>
    </tr>
    <tr>
      <td><code>variable-names</code></td>
      <td>
        Variable names of variables that are supposed to be retrieved. 
        All variables are retrieved by default.
      </td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><code>local-variables</code></td>
      <td>
        Whether or not variables from greater scope than the External Task
        should be fetched. When <code>false</code>, all variables visible in the
        scope will be fetched. When <code>true</code>, only local variables to
        the scope of the External Task will be fetched.
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>include-extension-properties</code></td>
      <td>
        Whether or not to include custom extension properties for fetched
        External Tasks. When <code>true</code>, all
        <code>extensionProperties</code> defined in the External Service Task
        will be provided. When <code>false</code>,
        <code>extensionProperties</code> defined in the External Service Task
        will be ignored.
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>business-key</code></td>
      <td>
        Only External Tasks related to the specified business key are fetched.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>process-definition-id</code></td>
      <td>
        Only External Tasks related to the specified process definition id are
        fetched.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>process-definition-id-in</code></td>
      <td>
        Only External Tasks related to the specified list of process definition
        ids are fetched. List of ids have logical OR semantic.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>process-definition-key</code></td>
      <td>
        Only External Tasks related to the specified process definition key are
        fetched.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>process-definition-key-in</code></td>
      <td>
        Only External Tasks related to the specified list of process definition
        keys are fetched. List of keys have logical OR semantic.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>process-definition-version-tag</code></td>
      <td>
        Only External Tasks related to the specified process definition version
        tag are fetched.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>process-variables</code></td>
      <td>
        Only External Tasks related to the specified map of process variables
        (key: variable name, value: variable value) are fetched. Map of
        variables have logical OR semantic.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>without-tenant-id</code></td>
      <td>
        Only External Tasks without a tenant id are fetched.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><code>tenant-id-in</code></td>
      <td>
        Only External Tasks related to the specified list of tenant ids are
        fetched. List of ids have logical OR semantic.
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

#### Logging

To log the Client's internal workings, you can set the level of the logger `org.camunda.bpm.client.spring` to `DEBUG`.

You can set the log level in your `application.yml` file as follows:

```yaml
logging.level.org.camunda.bpm.client.spring: DEBUG
```

For debugging, it might be helpful to increase the level of the logger `org.camunda.bpm.client` as well.

### Request Interceptor

A request interceptor is called whenever the Client performs an HTTP request. You can use this 
extension point, for example, to implement a custom authentication strategy like OAuth 2.0.

You can register one or more request interceptors by defining beans of type `ClientRequestInterceptor`:

```java
@Configuration
public class RequestInterceptorConfiguration implements ClientRequestInterceptor {
  // ...
}
```

### Backoff Strategy

By default, the Client uses an exponential backoff strategy. You can replace it with a custom strategy
by defining a bean of type `BackoffStrategy`:

```java
@Configuration
public class BackoffStrategyConfiguration implements BackoffStrategy {
  // ...
}
```

### Resolving Properties

String-based Client configuration properties can be resolved from a custom properties file by
defining a bean of type `PropertySourcesPlaceholderConfigurer`:

```java
@Configuration
public class PropertyPlaceholderConfiguration 
    extends PropertySourcesPlaceholderConfigurer {

  public PropertyPlaceholderConfiguration() {
    // Specify the *.properties file name that contains the property placeholders
    Resource location = new ClassPathResource("client.properties");
    setLocation(location);
  }

}
```

When using the example shown above, the Client tries to resolve string-based properties from a
`client.properties` file as follows:

```properties
client.baseUrl=http://localhost:8080/engine-rest
client.workerId=spring-boot-worker
client.dateFormat=yyyy-MM-dd'T'HH:mm:ss.SSSZ
client.serializationFormat=application/json
```

Make sure to reference the respective placeholders defined above in your `application.yml` file:

```yaml
camunda.bpm.client:
  base-url: ${client.baseUrl}
  worker-id: ${client.workerId}
  date-format: ${client.dateFormat}
  default-serialization-format: ${client.serializationFormat}
```

### Custom Client

You can bootstrap the Client programmatically, which skips the internal creation of the Client:

```java
@Configuration
public class CustomClientConfiguration { 

  @Bean
  public ExternalTaskClient customClient() {
    return ExternalTaskClient.create()
        .baseUrl("http://localhost:8080/engine-rest")
        .build();
  }

}
```

## Beans

You can define handler beans, but more beans are defined internally, and they are beyond your control. 
However, these beans can be accessed via auto wiring.

### Client Bean

When not already defined by the user (see [Custom Client](#custom-client)), a bean with the name 
`externalTaskClient` of type `ExternalTaskClient` is constructed.

### Subscription Bean

Based on a handler bean annotated with `@ExternalTaskSubscription`, a subscription bean of type
`SpringTopicSubscription` is constructed. The bean name is composed of: 

```
handler bean name + "Subscription"
```

For instance, the following handler bean definition:

```java
@Bean
@ExternalTaskSubscription("creditScoreChecker")
public ExternalTaskHandler creditScoreCheckerHandler() {
  // ...
}
```

Will result in the subscription bean name:

```
creditScoreCheckerHandlerSubscription
```

## Spring-only Module

If you want to use Spring instead of Spring Boot, you can add the following Maven dependency 
to your `pom.xml` file:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-external-task-client-spring</artifactId>
  <version>{{< minor-version >}}.0</version>
</dependency>
```

To bootstrap the Client, use the class annotation `@EnableExternalTaskClient`. You can find all
configuration attributes in the 
{{< javadocref page="org/camunda/bpm/client/spring/annotation/EnableExternalTaskClient.html" text="Javadocs" >}}.
