---

title: "Hypertext Application Language (HAL)"
weight: 40

menu:
  main:
    identifier: "rest-api-overview-hal"
    parent: "rest-api-overview"

---

The REST API provides some resources in an additional media type. The
[HAL](http://stateless.co/hal_specification.html) media type `application/hal+json` describes a format which contains
links and information about other resources. This allows us to embed the
process definition or assignee of a task directly into the response, which in turn
reduces the number of necessary requests to gather all information about a
single task or a list of tasks.

In order to interact with `HAL`, you have to set `application/hal+json` as Accept header. The
response of a `HAL` request has always the following structure:

```json
{
  "_links" : {},
  "_embedded" : {}
}
```

The property `_links` contains relational links that give an easy way to navigate between
associated resources. A `_links` property contains at least a `self` relational link. The
property `_embedded` includes other linked resources in the representing resource. Each
embedded resource will be structured as a `HAL` resource.


# Example: Resource


## Request

GET `/task/a-task-id`

Request Header:
```
Accept: application/hal+json
```

## Response

```json
{
  "_links" : {
    "self": {
      "href": "/task/a-task-id"
    },
    "assignee": {
      "href": "/user/demo"
    },
    ...
  },
  "_embedded" : {
    "group" : [{
      "_links" : {
        "self" : {
          "href" : "/group/management"
        }
      },
      "_embedded" : null,
      "id" : "management",
      ...
    }],
    "processDefinition" : [ {...}, {...} ],
    ...
  },
  "id" : "a-task-id",
  "name": "Assign Approver",
  "assignee": "demo",
  ...
}
```


# Example: Collection

## Request

GET `/task`

Request Header:
```
Accept: application/hal+json
```

## Response

```json
{
  "_links" : {
    "self": {
      "href": "/task"
    }
  },
  "_embedded" : {
    "assignee" : [{
      "_links" : {
        "self" : {
          "href" : "/user/demo"
        }
      },
      "_embedded" : null,
      id: "demo",
      ...
    }],
    "processDefinition" : [ {...} ],
    "task" : [{
      "_links" : {
        "self": {
          "href": "/task/a-task-id"
        },
        "assignee": {
          "href": "/user/demo"
        },
        ...
      },
      "_embedded" : {
        "variable" : [ {...}, {...} ]
      },
      "id" : "a-task-id",
      "name": "Assign Approver",
      "assignee": "demo",
      ...
    }, {
      ...
    }]
  },
  "count" : 2
}
```


# Caching of HAL relations

During the generation of a HAL response, linked resources are resolved to embed
them.  Some of these resolved resources, like process definitions or users, are
rarely modified. Also, if user information is stored in an external system (such as
LDAP), every request will access this external system which is an
unnecessary overhead. To reduces such expensive requests, the REST API can be
configured to use a cache to temporary store such relations.

This caching can be configured in the `web.xml` file of the REST API (or the Camunda Web Application in
case the REST API is embedded into the Camunda Web Application).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

  <!-- ... -->

  <listener>
    <listener-class>org.camunda.bpm.engine.rest.hal.cache.HalRelationCacheBootstrap</listener-class>
  </listener>

  <context-param>
    <param-name>org.camunda.bpm.engine.rest.hal.cache.config</param-name>
    <param-value>
      {
        "cacheImplementation": "org.camunda.bpm.engine.rest.hal.cache.DefaultHalResourceCache",
        "caches": {
          "org.camunda.bpm.engine.rest.hal.user.HalUser": {
            "capacity": 100,
            "secondsToLive": 900
          },
          "org.camunda.bpm.engine.rest.hal.group.HalGroup": {
            "capacity": 100,
            "secondsToLive": 900
          },
          "org.camunda.bpm.engine.rest.hal.processDefinition.HalProcessDefinition": {
            "capacity": 100,
            "secondsToLive": 600
          }
        }
      }
    </param-value>
  </context-param>

  <!-- ... -->

</web-app>
```

## The HalRelationCacheBootstrap Listener

To bootstrap the caching, the `HalRelationCacheBootstrap` context listener is
used:

```xml
<listener>
  <listener-class>org.camunda.bpm.engine.rest.hal.cache.HalRelationCacheBootstrap</listener-class>
</listener>
```

It is configured by the context parameter
`org.camunda.bpm.engine.rest.hal.cache.config`. The configuration is provided
as JSON and consists of two properties:

<table class="table table-striped">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>cacheImplementation</td>
    <td>
      The class which is used as cache. The class has to implement the
      <code>org.camunda.bpm.engine.rest.cache.Cache</code> interface.
      A simple default implementation is provided by the
      <code>org.camunda.bpm.engine.rest.hal.cache.DefaultHalResourceCache</code> class.
    </td>
  </tr>
  <tr>
    <td>caches</td>
    <td>
      A JSON object to specify which HAL relations should be cached. Every HAL relation cache is configured
      separately and identified by the HalResource class to cache. The possible configuration parameters
      depend on the cache implementation and have to be available as setters on the implementation class.
    </td>
  </tr>
</table>

## DefaultHalResourceCache Configuration Options

The simple default cache implementation `DefaultHalResourceCache` provides following configuration
options:

<table class="table table-striped">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>capacity</td>
    <td>
      The number of maximal cache entries.
    </td>
  </tr>
  <tr>
    <td>secondsToLive</td>
    <td>
      The number of seconds a cache entry is valid. If a cache entry is expired, it is removed
      and resolved again.
    </td>
  </tr>
</table>

## List of Resources which support Caching

* Case Definition: `org.camunda.bpm.engine.rest.hal.caseDefinition.HalCaseDefinition`
* Group: `org.camunda.bpm.engine.rest.hal.group.HalGroup`
* Identity Links (of a Task): `org.camunda.bpm.engine.rest.hal.identitylink.HalIdentityLink`
* Process Definition: `org.camunda.bpm.engine.rest.hal.processDefinition.HalProcessDefinition`
* Task: `org.camunda.bpm.engine.rest.hal.task.HalTask`
* User: `org.camunda.bpm.engine.rest.hal.user.HalUser`
