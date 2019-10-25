---

title: 'Get Activity Instance'
weight: 30

menu:
  main:
    identifier: "rest-api-process-instance-get-activity-instance"
    parent: "rest-api-process-instance"
    pre: "GET `/process-instance/{id}/activity-instances`"

---


Retrieves an Activity Instance (Tree) for a given process instance by id.


# Method

GET `/process-instance/{id}/activity-instances`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance for which the activity instance should be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the Activity Instance tree of the given process instance.

The properties of an activity instance are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the activity instance.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity.</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>String</td>
    <td>The name of the activity.</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>String</td>
    <td>The type of activity (corresponds to the XML element name in the BPMN 2.0, e.g., 'userTask').</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance this activity instance is part of.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>childActivityInstances</td>
    <td>List of activityInstance</td>
    <td>A list of child activity instances.</td>
  </tr>
  <tr>
    <td>childTransitionInstances</td>
    <td>List of transitionInstance</td>
    <td>A list of child transition instances. A transition instance represents an execution waiting in an asynchronous continuation.</td>
  </tr>
  <tr>
    <td>executionIds</td>
    <td>List of String</td>
    <td>A list of execution ids.</td>
  </tr>
  <tr>
    <td>incidentIds</td>
    <td>List of String</td>
    <td>A list of incident ids.</td>
  </tr>
</table>

The properties of a transition instance are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the transition instance.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job)</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>String</td>
    <td>The name of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job)</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>String</td>
    <td>The type of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job). Corresponds to the XML element name in the BPMN 2.0, e.g., 'userTask'.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>List of String</td>
    <td>A list of execution ids.</td>
  </tr>
  <tr>
    <td>incidentIds</td>
    <td>List of String</td>
    <td>A list of incident ids.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Process instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-instance/aProcessInstanceId/activity-instances`

## Response

    {
      "id": "eca75c6b-f70c-11e9-8777-e4a7a094a9d6",
      "parentActivityInstanceId": null,
      "activityId": "invoice:2:e9d77375-f70c-11e9-8777-e4a7a094a9d6",
      "activityType": "processDefinition",
      "processInstanceId": "eca75c6b-f70c-11e9-8777-e4a7a094a9d6",
      "processDefinitionId": "invoice:2:e9d77375-f70c-11e9-8777-e4a7a094a9d6",
      "childActivityInstances": [
        {
          "id": "approveInvoice:eca89509-f70c-11e9-8777-e4a7a094a9d6",
          "parentActivityInstanceId": "eca75c6b-f70c-11e9-8777-e4a7a094a9d6",
          "activityId": "approveInvoice",
          "activityType": "userTask",
          "processInstanceId": "eca75c6b-f70c-11e9-8777-e4a7a094a9d6",
          "processDefinitionId": "invoice:2:e9d77375-f70c-11e9-8777-e4a7a094a9d6",
          "childActivityInstances": [],
          "childTransitionInstances": [],
          "executionIds": [
            "eca75c6b-f70c-11e9-8777-e4a7a094a9d6"
          ],
          "activityName": "Approve Invoice",
          "incidentIds": [
            "648d7e21-f71c-11e9-a725-e4a7a094a9d6"
          ],
        }
      ],
      "childTransitionInstances": [],
      "executionIds": [
        "eca75c6b-f70c-11e9-8777-e4a7a094a9d6"
      ],
      "activityName": "Invoice Receipt",
      "incidentIds": null,
    }