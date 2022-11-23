---

title: 'Set Job Retries Async (POST)'
weight: 110

menu:
  main:
    name: "Set Job Retries Async (POST)"
    identifier: "rest-api-job-post-set-job-retries-async"
    parent: "rest-api-job"
    pre: "POST `/job/retries`"

---

Create a batch to set retries of jobs asynchronously.


# Method

POST `/job/retries`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>jobIds</td>
    <td>A list of job ids to set retries for.</td>
  </tr>
  <tr>
    <td>jobQuery</td>
    <td>
      A job query like the request body for the 
      <a href="{{< ref "/reference/rest/job/post-query.md#request-body" >}}">
        Get Jobs (POST)
      </a> method.
    </td>
  </tr>
  <tr>
    <td>retries</td>
    <td>An integer representing the number of retries. Please note that the value cannot be negative or null.</td>
  </tr>
</table>

Please note that if both jobIds and jobQuery are provided, then retries will be set on the union
of these sets. 

## Response Body

A JSON object corresponding to the Batch interface in the engine. Its properties are as follows:

{{< rest-batch-response >}}

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
    <td>Returned if some of the query parameters are invalid, for example if neither processInstanceIds nor processInstanceQuery is present. Or if the retry count is not specified. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/job/retries`

Request Body:

    {
      "retries" : 5,
      "jobIds": ["aJob","secondJob"],
      "jobQuery": {
        "dueDates":
          [
            {
              "operator": "gt",
              "value": "2012-07-17T17:00:00.000+0200"
            },
            {
              "operator": "lt",
              "value": "2012-07-17T18:00:00.000+0200"
            }
          ]
      }
    }

## Response

Status 200 OK

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "jobsCreated": 10,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "suspened": false,
  "tenantId": "aTenantId",
  "createUserId": "userId"
}
```
