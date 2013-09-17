---

title: 'Set Job Retries'
category: 'Job'

keywords: 'put'

---


Sets the retries of the job to the given number of retries.


Method
------

PUT <code>/job/{id}/retries</code>


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
    <td>The id of the job to be retrieved.</td>
  </tr>
</table>
  

#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>retries</td>
    <td>The number of retries to set that a job has left.</td>
  </tr>
</table>


Result
------

This method returns no content.


Response codes
--------------  

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
    <td>Job with given id does not exist. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>  
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The retries could not be set successfully. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

PUT <code>/job/aJobId/retries</code>

Request body:

    {"retries": 3}

#### Response

  Status 204. No content.
