---

title: 'Get Event Subscriptions'
weight: 40

menu:
  main:
    name: "Get List"
    identifier: "rest-api-event-subscription-get-query"
    parent: "rest-api-event-subscription"
    pre: "GET `/event-subscription`"

---



Queries for event subscriptions that fulfill given parameters.
The size of the result set can be retrieved by using the [Get Event Subscription Count]({{< ref "/reference/rest/event-subscription/get-query-count.md" >}}) method.


# Method

GET `/event-subscription`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>eventSubscriptionId</td>
    <td>Only select subscription with the given id.</td>
  </tr>
  <tr>
    <td>eventName</td>
    <td>Only select subscriptions for events with the given name.</td>
  </tr>
  <tr>
    <td>eventType</td>
    <td>Only select subscriptions for events with the given type. Valid values: <code>message</code>, <code>signal</code>, <code>compensate</code>, and <code>conditional</code>.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Only select subscriptions that belong to an execution with the given id.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Only select subscriptions that belong to a process instance with the given id.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Only select subscriptions that belong to an activity with the given id.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. Only select subscriptions that belong to one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only select subscriptions which have no tenant id. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>includeEventSubscriptionsWithoutTenantId</td>
    <td>Select event subscriptions which have no tenant id. Can be used in combination with <code>tenantIdIn</code>  parameter. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>created</code> and <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


# Result

A JSON array of event subscription objects.
Each event subscription object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the event subscription.</td>
  </tr>
  <tr>
    <td>eventType</td>
    <td>String</td>
    <td>The type of the event subscription. </td>
  </tr>
  <tr>
    <td>eventName</td>
    <td>String</td>
    <td>The name of the event this subscription belongs to as defined in the process model.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The execution that is subscribed on the referenced event.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td> The process instance this subscription belongs to. </td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The identifier of the activity that this event subscription belongs to. This could for example be the id of a receive task.</td>
  </tr>
   <tr>
    <td>createdDate</td>
    <td>Date</td>
    <td>The time this event subscription was created.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant this event subscription belongs to. Can be <code>null</code> if the subscription belongs to no single tenant.</td>
  </tr>
</table>


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/event-subscription?eventType=message&sortBy=created&sortOrder=desc`

## Response

```json
[
  {
    "id": "anId",
    "eventType": "message",
    "eventName": "anEventName",
    "executionId": "anExecutionId",
    "processInstanceId": "aProcessInstanceId",
    "activityId": "anActivityId",
    "createdDate": "2020-04-20T15:23:12.229+0200",
    "tenantId": null
  },
  {
    "id": "anotherId",
    "eventType": "message",
    "eventName": "anotherEventName",
    "executionId": "anotherExecutionId",
    "processInstanceId": "anotherProcessInstanceId",
    "activityId": "anotherActivityId",
    "createdDate": "2020-04-20T15:20:12.229+0200",
    "tenantId": null
  }
]
```
