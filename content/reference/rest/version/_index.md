---

title: "Version"
weight: 230
layout: "single"

menu:
  main:
    identifier: "rest-api-version"
    parent: "rest-api"

---


Retrieves the version of the Rest API.


# Method

GET `/version`


# Parameters

This method takes no parameters.


# Result

A JSON array containing the version of the Rest API.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>version</td>
    <td>String</td>
    <td>The version of the Rest API.</td>
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
</table>


# Example

## Request

GET `/version`

## Response

```json
{
    "version": "7.10.0"
}
```
