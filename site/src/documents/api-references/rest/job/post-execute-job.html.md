---

title: 'Execute Job'
category: 'Job'

keywords: 'post'

---


Executes the job. <strong>Note:</strong> The execution of the job happens in synchronously in the same thread.</code>


Method
------

POST <code>/job/{id}/execute</code>


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
    <td>The job could not be executed successfully. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

PUT <code>/job/aJobId/execute</code>

#### Response

  Status 204. No content.
