---

title: 'Get Event Subscriptions Count'
weight: 50

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-event-subscription-get-query-count"
    parent: "rest-api-event-subscription"
    pre: "GET `/event-subscription/count`"

---



Queries for the number of event subscriptions that fulfill given parameters.
Takes the same parameters as the [Get Event Subscription]({{< ref "/reference/rest/event-subscription/get-query.md" >}}) method.


# Method

GET `/event-subscription/count`


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
</table>

# Result

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching event subscriptions.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/event-subscription/count`

## Response

```json
{
  "count": 1
}
```
