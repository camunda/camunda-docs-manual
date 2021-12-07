---

title: "Configure Telemetry"
weight: 10

menu:
  main:
    name: "Configure Telemetry"
    identifier: "rest-api-telemetry-configure"
    parent: "rest-api-telemetry"
    pre: "POST `/telemetry/configuration`"

---


Configures whether Camunda receives data collection of the process engine setup and usage.
For more information, please check the [Telemetry]({{< ref "/introduction/telemetry.md" >}}) page.


# Method

POST `/telemetry/configuration`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>enableTelemetry</td>
    <td>Specifies if the data collection should be sent or not.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>If the user who perform the operation is not a <b>camunda-admin</b> user.</td>
  </tr>
</table>

Also see the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">introduction</a> for the error 
response format.

# Example


## Request

POST `/telemetry/configuration`

Request Body:

```json
{
  "enableTelemetry":true
}
```


## Response

Status 204. No content.
