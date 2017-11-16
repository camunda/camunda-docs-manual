---

title: "Get Historic Decision Instance Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-decision-instance-query-count"
    parent: "rest-api-history-decision-instance"
    pre: "GET `/history/decision-instance/count`"

---


Queries for the number of historic decision instances that fulfill the given
parameters. Takes the same parameters as the [Get Historic Decision Instances]({{< relref "reference/rest/history/decision-instance/get-decision-instance-query.md" >}}) method.


# Method

GET `/history/decision-instance/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>decisionInstanceId</td>
    <td>Filter by decision instance id.</td>
  </tr>
  <tr>
    <td>decisionInstanceIdIn</td>
    <td>Filter by decision instance ids. Must be a comma-separated list of decision instance ids.</td>
  </tr>
    <td>decisionDefinitionId</td>
    <td>Filter by the decision definition the instances belongs to.</td>
  </tr>
  </tr>
    <td>decisionDefinitionIdIn</td>
    <td>
    Filter by the decision definitions the instances belongs to. Must be a comma-separated list of decision definition ids.
    </td>
  </tr>
  <tr>
    <td>decisionDefinitionKey</td>
    <td>Filter by the key of the decision definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>decisionDefinitionKeyIn</td>
    <td>Filter by the keys of the decision definition the instances belongs to. Must be a comma-separated list of decision definition keys.</td>
  </tr>
  <tr>
    <td>decisionDefinitionName</td>
    <td>Filter by the name of the decision definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>decisionDefinitionNameLike</td>
    <td>Filter by the name of the decision definition the instances belongs to, that the parameter is a substring of.</td>
  </tr>
  </tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the instances belongs to.</td>
  </tr>
  </tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the instances belongs to.</td>
  </tr>
  </tr>
    <td>caseDefinitionId</td>
    <td>Filter by the case definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Filter by the key of the case definition the instances belongs to.</td>
  </tr>
  </tr>
    <td>caseInstanceId</td>
    <td>Filter by the case instance the instances belongs to.</td>
  </tr>
  </tr>
    <td>activityIdIn</td>
    <td>
      Filter by the activity ids the instances belongs to.
      Must be a comma-separated list of acitvity ids.
    </td>
  </tr>
  </tr>
    <td>activityInstanceIdIn</td>
    <td>
      Filter by the activity instance ids the instances belongs to.
      Must be a comma-separated list of acitvity instance ids.
    </td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A historic decision instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>evaluatedBefore</td>
    <td>
      Restrict to instances that were evaluated before the given date.
      By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.
    </td>
  </tr>
  <tr>
    <td>evaluatedAfter</td>
    <td>
      Restrict to instances that were evaluated after the given date.
      By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.
    </td>
  </tr>
  <tr>
    <td>userId</td>
    <td>
      Restrict to instances that were evaluated by the given user.
    </td>
  </tr>
  <tr>
    <td>rootDecisionInstanceId</td>
    <td>
      Restrict to instances that have a given root decision instance id.
      This also includes the decision instance with the given id.
    </td>
  </tr>
  <tr>
    <td>rootDecisionInstancesOnly</td>
    <td>
      Restrict to instances those are the root decision instance of an evaluation.
      Value may only be <code>true</code>, as <code>false</code> is the default behavior.
    </td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionId</td>
    <td>Filter by the decision requirements definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionKey</td>
    <td>Filter by the key of the decision requirements definition the instances belongs to.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>The number of matching historic decision instances.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/decision-instance/count`

## Response

```json
{
  "count": 4
}
```
