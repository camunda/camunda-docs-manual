<h1>Set Job Due Date</h1>

<p>Sets the due date of the job to the given date.</p>

<h2>Method</h2>

<p>PUT <code>/job/{id}/duedate</code></p>

<h2>Parameters</h2>

<h4>Path Parameters</h4>

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

<h4>Request Body</h4>

<p>A json object with the following properties:</p>

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>duedate</td>
    <td>The date to set when the job has the next execution.</td>
  </tr>
</table>

<h2>Result</h2>

<p>This method returns no content.</p>

<h2>Response codes</h2>

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
    <td>Job with given id does not exist. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr><br>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The duedate could not be set successfully. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

<h2>Example</h2>

<h4>Request</h4>

<p>PUT <code>/job/aJobId/duedate</code></p>

<p>Request body:</p>

<pre><code>{"duedate": "2013-08-13 18:43:28"}
</code></pre>

<h4>Response</h4>

<p>Status 204. No content.</p>