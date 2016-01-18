---

title: 'Get Process Diagram'
weight: 20

menu:
  main:
    name: "Get Diagram"
    identifier: "rest-api-process-definition-get-process-diagram"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/diagram`
          </br>
          GET `/process-definition/key/{key}/diagram` (returns the diagram for the latest version of the process definition)"

---

Retrieves the diagram of a process definition.


# Method

GET `/process-definition/{id}/diagram`

GET `/process-definition/key/{key}/diagram` (returns the diagram for the latest version of the process definition)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
</table>

Note that the path parameter `key` cannot be used when more than one tenant has a process definition with the given key.

# Result

The image diagram of this process.

# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>image/png, image/gif, ... (defaults to application/octet-stream if the file suffix is unknown</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>The process definition doesn't have an associated diagram.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The path parameter "key" has no value or the process definition with given id does not exist.<br/>If more than one tenant has a process definition with the given key. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given id or key does not exist.
        See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/diagram`

GET `/process-definition/key/invoice/diagram`
