---

title: 'Get Activity Instance'
category: 'Process Instance'

keywords: 'get'

---


Retrieves an Activity Instance (Tree) for a given process instance.


Method
------

GET `/process-instance/{id}/activity-instances`


Parameters
----------

#### Path Parameters

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


Result
------

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
    <td>The type of activity (corresponds to the XML element name in the BPMN 2.0, e.g. 'userTask').</td>
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
    <td>The type of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job). Corresponds to the XML element name in the BPMN 2.0, e.g. 'userTask'.</td>
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
</table>


Response codes
--------------

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
    <td>Process instance with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/process-instance/aProcessInstanceId/activity-instances`

#### Response

    {
      "id": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",
      "parentActivityInstanceId": null,
      "activityId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",
      "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",
      "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",
      "childActivityInstances": [
          {
              "id": "SubProcess_1:8f72bca4-d505-11e2-bafa-3c970e140ef1",
              "parentActivityInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",
              "activityId": "SubProcess_1",
              "activityType": "subProcess",
              "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",
              "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",
              "childActivityInstances": [],
              "childTransitionInstances": [
                  {
                      "id": "8f72bca9-d505-11e2-bafa-3c970e140ef1",
                      "parentActivityInstanceId": "SubProcess_1:8f72bca4-d505-11e2-bafa-3c970e140ef1",
                      "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",
                      "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",
                      "activityId": "ServiceTask_1",
                      "executionId": "8f72bca9-d505-11e2-bafa-3c970e140ef1"
                  },
                  {
                      "id": "8f72bcaa-d505-11e2-bafa-3c970e140ef1",
                      "parentActivityInstanceId": "SubProcess_1:8f72bca4-d505-11e2-bafa-3c970e140ef1",
                      "processInstanceId": "8f72bc9f-d505-11e2-bafa-3c970e140ef1",
                      "processDefinitionId": "executionProcess:1:8ef5c393-d505-11e2-bafa-3c970e140ef1",
                      "activityId": "ServiceTask_2",
                      "executionId": "8f72bcaa-d505-11e2-bafa-3c970e140ef1"
                  }
              ],
              "executionIds": [
                  "8f72bc9f-d505-11e2-bafa-3c970e140ef1"
              ]
          }
      ],
      "childTransitionInstances": [],
      "executionIds": [
          "8f72bc9f-d505-11e2-bafa-3c970e140ef1"
      ]
    }