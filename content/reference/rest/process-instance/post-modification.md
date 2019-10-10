---

title: 'Modify Process Instance Execution State'
weight: 100

menu:
  main:
    name: "Modify"
    identifier: "rest-api-process-instance-modify"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/{id}/modification`"

---

<p>Submits a list of modification instructions to change a process instance's execution state. A modification instruction is one of the following:</p>

<ul>
  <li>Starting execution before an activity</li>
  <li>Starting execution after an activity on its single outgoing sequence flow</li>
  <li>Starting execution on a specific sequence flow</li>
  <li>Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity</li>
</ul>

<p>Instructions are executed immediately and in the order they are provided in this request's body. Variables can be provided with every starting instruction.</p>

<p>The exact semantics of modification can be read about in the <a href="{{< ref "/user-guide/process-engine/process-instance-modification.md" >}}">user guide</a>.</p>

# Method

POST `/process-instance/{id}/modification`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to modify.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>Skip execution listener invocation for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>Skip execution of <a href="{{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>instructions</td>
    <td>
        A JSON array of modification instructions. The instructions are executed in the order they are in. An instruction may have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>type</td>
          <td><b>Mandatory.</b> One of the following values: <code>cancel</code>, <code>startBeforeActivity</code>, <code>startAfterActivity</code>, <code>startTransition</code>. A <code>cancel</code> instruction requests cancellation of a single activity instance or all instances of one activity. A <code>startBeforeActivity</code> instruction requests to enter a given activity. A <code>startAfterActivity</code> instruction requests to execute the single outgoing sequence flow of a given activity. A <code>startTransition</code> instruction requests to execute a specific sequence flow.</td>
        </tr>
        <tr>
          <td>activityId</td>
          <td><b>Can be used with instructions of types <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>cancel</code>.</b> Specifies the activity the instruction targets.</td>
        </tr>
        <tr>
          <td>transitionId</td>
          <td><b>Can be used with instructions of types <code>startTransition</code></b>. Specifies the sequence flow to start.</td>
        </tr>
        <tr>
          <td>activityInstanceId</td>
          <td><b>Can be used with instructions of type <code>cancel</code>.</b> Specifies the activity instance to cancel. Valid values are the activity instance IDs supplied by the <a href="{{< ref "/reference/rest/process-instance/get-activity-instances.md" >}}">Get Activity Instance</a> request.</td>
        </tr>
        <tr>
          <td>transitionInstanceId</td>
          <td><b>Can be used with instructions of type <code>cancel</code>.</b> Specifies the transition instance to cancel. Valid values are the transition instance IDs supplied by the <a href="{{< ref "/reference/rest/process-instance/get-activity-instances.md" >}}">Get Activity Instance</a> request.</td>
        </tr>
        <tr>
          <td>ancestorActivityInstanceId</td>
          <td><p><b>Can be used with instructions of type <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>startTransition</code>.</b> Valid values are the activity instance IDs supplied by the <a href="{{< ref "/reference/rest/process-instance/get-activity-instances.md" >}}">Get Activity Instance</a> request.</p>
          <p>If there are multiple parent activity instances of the targeted activity, this specifies the ancestor scope in which hierarchy the activity/transition is to be instantiated.</p>
          <p>Example: When there are two instances of a subprocess and an activity contained in the subprocess is to be started, this parameter allows to specifiy under which subprocess instance the activity should be started.</p></td>
        </tr>
        <tr>
          <td>variables</td>
          <td><p><b>Can be used with instructions of type <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>startTransition</code>.</b> A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object.</p>
          {{< rest-var-request local="Indicates whether the variable should be a local variable or not. If set to <code>true</code>, the variable becomes a local variable of the execution entering the target activity." >}}</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>annotation</td>
    <td>An arbitrary text annotation set by a user for auditing reasons.</td>
  </tr>

</table>


# Result

This method returns no content.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>At least one modification instruction misses required parameters.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The modification cannot be performed, for example because it starts a failing activity.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/aProcessInstanceId/modification`

Request Body:

    {
    "skipCustomListeners": true,
    "skipIoMappings": true,
    "instructions": [
        {
          "type": "startBeforeActivity",
          "activityId": "activityId",
          "variables":
            {"var": {
              "value": "aVariableValue",
              "local": false,
              "type": "String"},
            "varLocal": {
              "value": "anotherVariableValue",
              "local": true,
              "type": "String"}
            }
        },
        {
          "type": "cancel",
          "activityInstanceId": "anActivityInstanceId",
        }
      ],
    "annotation": "Modified to resolve an error."
    }

## Response

Status 204. No content.
