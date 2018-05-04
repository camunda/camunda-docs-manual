---

title: 'External Task Client'
weight: 270

menu:
  main:
    identifier: "external-task-client"
    parent: "user-guide"

---
# Camunda External Task Client

The **Camunda External Task Client** allows to set up remote Service Tasks for your workflow. There is a supported [Java](https://github.com/camunda/camunda-external-task-client-java)
as well as [JavaScript](https://github.com/camunda/camunda-external-task-client-js) implementation.

## Features
* Complete External Tasks
* Extend the lock duration of External Tasks
* Unlock External Tasks
* Report BPMN errors as well as failures
* Share primitive and object typed process variables with the Workflow Engine

## Bootstrapping the Client

```html
{{< img src="img/externalTaskCient.png" title="External Task Cient Architecture" >}}
```

The client allows to handle service tasks of type "external". In order to to configure and instantiate the client, all supported implementations offer a convenient interface.
The communication between the client and the Camunda Workflow Engine is HTTP. Hence, the respective URL of the REST API is a mandatory information.

### Request Interceptors
To add additional HTTP headers to the performed REST API requests, the concept of request interceptors comes in handy.
This concept is, for instance, necessary in the context of authentication. Request interceptors can be added while bootstrapping the client.
It is also possible to add custom request intereceptors, for more details please check the documentation related to the client of interest.

#### Basic Authentication
In some cases it is necessary to secure the REST API of the Camunda Workflow Engine via Basic Authentication. For such
situations the a Basic Authentication implementation is provided by the client. Therefore, the respective user credentials are required.
Once configured, the basic authentication header is added to each REST API request.

### Topic Subscription

If a Service Task of the type "External" is placed inside a workflow, a topic name must be specified. The corresponding
BPMN 2.0 XML could look as follows:

```xml
...
<serviceTask id="checkCreditScoreTask"
  name="Check credit score"
  camunda:type="external"
  camunda:topic="creditScoreChecker" />
...
```

As soon as the Workflow Engine reached an External Task in a BPMN process, a corresponding activity instance is created, which is waiting to be fetched and locked by a client.

The client subscribes to the topic and fetches continuously for newly appearing External Tasks provided by the
Workflow Engine. Each fetched External Task is marked with a temporary lock. Like this, no other clients can work on this
certain External Task in the meanwhile.

When setting up a new topic subscription, some mandatory configurations like topic name, lock duration and handler need to be specified.
Once a topic has been subscribed, the client starts immediately to fetch and lock External Tasks. A lock is valid for the specified period of time.
The External Task is now invisible for other clients and cannot be locked again. As soon as the lock duration expires, actions
cannot be applied to the External Task anymore. In this case, the External Task is released and available again for being fetched and locked by any client.

### Handler
Handlers can be used to implement custom routines which are invoked whenever an External Task is fetched and locked successfully.
For each topic subscription a External Task handler interface is provided.

### Completing Tasks
Once the custom routines specified in the handler are completed, the External Task can be completed. This means for the Workflow Engine that the execution will
move on. For this purpose, all supported implementations have a `complete` method which can be called within the handler function. However, the
External Task can only be completed, if it is currently locked by the client.

### Extending the Lock Duration of Tasks
Sometimes the completion of custom routines takes longer than expected. In this case the lock duration needs to be extended.
This action can be performed by calling a `extendLock` method passing the new lock duration.
The lock duration can only be extended, if the External Task is currently locked by the client.

### Unlocking Tasks
If an External Task is supposed to be unlocked so that other clients are allowed to fetch and lock this task again,
a `unlock` method can be called. The External Task can only be unlocked, if the task is currently locked by the client.

### Reporting Failures
If the client faces a problem that makes it impossible to complete the External Task successfully, this problem can be reported to
the Workflow Engine. A failure can only be reported, if the External Task is currently locked by the client.
You can find a detailed documentation about this action in the Camunda BPM [User Guide](https://docs.camunda.org/manual/develop/user-guide/process-engine/external-tasks/#reporting-task-failure).

### Reporting BPMN Errors
[Error boundary events](https://docs.camunda.org/manual/develop/reference/bpmn20/events/error-events/#error-boundary-event)
are triggered by BPMN errors. A BPMN error can only be reported, if the External Task is currently locked by the client.
You can find a detailed documentation about this action in the Camunda BPM [User Guide](https://docs.camunda.org/manual/develop/user-guide/process-engine/external-tasks/#reporting-bpmn-error).

### Process Variables
Information can be shared between the clients and the Workflow Engine by means of process variables. The clients
supports a wide range of primitive types.

#### Supported Types
* Null
* Boolean
* String
* Date
* Short, Integer, Long
* Double
* Bytes

There exists two ways to work with variables: using the typed or the untyped API.

#### Untyped Variables
Untyped variables are stored by using the respective type of their values. It exists individual methods to store single and multiple variables. Besides storing, it is also possible to retrieve single and multiple variables.

**Note:** setting variables does not make sure that variables are persisted. Variables which were set locally on client-side
are only available during runtime and get lost if they are not shared with the Workflow Engine by successfully completing
the External Task of the current lock.

#### Typed Variables
For typed variables, the type is set explicitly. During compile time, it is checked whether or not the given value
corresponds to the defined type. Typed variables can also be retrieved, the received object provides a variety of information about the type,
the value, etc.
Of course it is also possible to set and get multiple typed variables.

### Logging

The client implementations support logging functionality since handlers are not invoked in the main thread. Hence it makes sense to enable the logging
and be reported about situations as:

* External Tasks could not be fetched and locked successfully
* An exception occurred...
   * while invoking a handler
   * while deserializing variables
   * while invoking a request interceptor
   * ...

Please check for more details the documentation related to the client of interest.

## Examples

Complete examples of how to set up the different External Task Clients can be found on GitHub ([Java](https://github.com/camunda/camunda-external-task-client-java/tree/master/examples),
[JavaScript](https://github.com/camunda/camunda-external-task-client-js/tree/master/examples)).