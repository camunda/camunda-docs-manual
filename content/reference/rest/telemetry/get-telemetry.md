---

title: "Fetch Telemetry Configuration"
weight: 10

menu:
  main:
    name: "Fetch Telemetry Configuration"
    identifier: "rest-api-telemetry-get-configuration"
    parent: "rest-api-telemetry"
    pre: "GET `/telemetry/configuration`"

---


Fetches the telemetry configuration. For more information on the telemetry topic, visit the [Telemetry]({{< ref "/introduction/telemetry.md" >}}) page.

# Method

GET `/telemetry/configuration`

# Parameters

This method takes no parameters.

# Result

A JSON object containing configuration properties of the telemetry of the Rest API.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>enableTelemetry</td>
    <td>Boolean</td>
    <td>Specifies if the telemetry is configured or not. Values:
        <ul>
          <li><code>null</code> - sending telemetry is not configured, no data will be sent</li>
          <li><code>true</code> - sending telemetry is enabled</li>
          <li><code>false</code> - sending telemetry is disabled</li>
        </ul>
    </td>
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
    <td>401</td>
    <td>application/json</td>
    <td>If the user who perform the operation is not a <b>camunda-admin</b> user.</td>
  </tr>
</table>

# Example


## Request

GET `/telemetry/configuration`


## Response


```json
{
  "enableTelemetry": false
}
```
