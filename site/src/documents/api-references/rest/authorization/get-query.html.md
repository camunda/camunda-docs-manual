Get Authorizations
==================

Query for a list of authorizations using a list of parameters.
The size of the result set can be retrieved by using the <a href="#!/authorization/get-query-count" doc-location-highlight>get authorization count</a> method.


Method
------

GET `/authorization`


Parameters
----------  
  
#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by the id of the authorization.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Filter by the type of the authorization.</td>
  </tr>
  <tr>
    <td>userIdIn</td>
    <td>Filter by a comma-seperated list of userIds</td>
  </tr>
  <tr>
    <td>groupIdIn</td>
    <td>Filter by a comma-seperated list of groupIds</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Filter by resource type</td>
  </tr> 
  <tr>
    <td>resourceId</td>
    <td>filter by resource Id.</td>
  </tr> 
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    `resourceType`, and `resourceId`.
    Must be used in conjunction with the `sortOrder` parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be `asc` for ascending order or `desc` for descending order.
    Must be used in conjunction with the `sortBy` parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table>


Result
------

A json array of authorization objects.
Each group object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the authorization.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Integer</td>
    <td>The type of the authorization. (0=global, 1=grant, 2=revoke).</td>
  </tr>
  <tr>
    <td>permissions</td>
    <td>Integer</td>
    <td>An integer holding the permissions provided by this authorization.</td>
  </tr> 
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user this authorization has been created for. The value "\*" represents a global authorization ranging over all users.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>String</td>
    <td>The id of the group this authorization has been created for.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Integer</td>
    <td>An integer representing the resource type.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>String</td>
    <td>The resource Id. The value "\*" represents an authorization ranging over all instances of a resource.</td>
  </tr>
</table>


Response codes
--------------  

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
    <td>Returned if some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy` is specified. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/authorization?userIdIn=jonny1,jonny2`
  
#### Response

Status 200.

    [{"id":"anAuthorizationId",
     "type": 0,
     "permissions": 16,
     "userId": "jonny1",
     "groupId": null,
     "resourceType": 1,
     "resourceId": "*"},
     {"id":"anotherAuthorizationId",
     "type": 0,
     "permissions": 16,
     "userId": "jonny2",
     "groupId": null,
     "resourceType": 1,
     "resourceId": "*"}]