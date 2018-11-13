---

title: "Create Case Instance"
weight: 60

menu:
  main:
    name: "Create"
    identifier: "rest-api-case-definition-post-create-case-instance"
    parent: "rest-api-case-definition"
    pre: "POST `/case-definition/{id}/create`
          </br>
          POST `/case-definition/key/{key}/create`
          </br>
          POST `/case-definition/key/{key}/tenant-id/{tenant-id}/create`"

---


Instantiates a given case definition. Case variables and business key may be supplied in the request body.


# Method

POST `/case-definition/{id}/create`

POST `/case-definition/key/{key}/create` (creates the latest version of the case definition which belongs to no tenant)

POST `/case-definition/key/{key}/tenant-id/{tenant-id}/create` (creates the latest version of the case definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case definition to be retrieved.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the case definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the case definition belongs to.</td>
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
    <td>variables</td>
    <td>A JSON object containing the variables the case instance is to be initialized with.
    Variable names are property keys of this object and variable values are JSON objects with a <code>value</code> and a <code>type</code> property (see example below).
    Valid variable values are Boolean, Number, String and Date values.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>The business key the case instance is to be initialized with.
	The business key uniquely identifies the case instance in the context of the given case definition.</td>
  </tr>
</table>


# Result

A JSON object representing the newly created case instance.
Properties are:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case instance.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition this case instance belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant this case instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the case instance.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case instance is active or not.
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
    <td>400</td>
    <td>application/json</td>
	<td>The case instance could not be created due to an invalid variable value, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The case execution cannot be instantiated because of CMMN restrictions. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
	<td>The case instance could not be created due to a nonexistent case definition. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The case instance could not be created successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/case-definition/aCaseDefinitionId/create`

POST `/case-definition/key/aCaseDefinitionKey/create`

Request Body:

    {
      "variables":
        {
          "aVariable" : {"value" : "aStringValue", "type": "String"},
          "anotherVariable" : {"value" : true, "type": "Boolean"}
        },
	    "businessKey" : "myBusinessKey"
	}

## Response

    {
      "links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
      "id":"anId",
      "caseDefinitionId":"aCaseDefinitionId",
      "tenantId":null,
      "businessKey":"myBusinessKey",
      "active":true
    }
