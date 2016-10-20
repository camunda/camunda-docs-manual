---

title: 'Perform an Authorization Check'
category: 'Authorization'

keywords: 'get'

---


Performs an authorization check for the currently authenticated user.

Method
------

GET `/authorization/check`


Parameters
----------

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Required?</th>
  </tr>
  <tr>
    <td>permissionName</td>
    <td>String value representing the permission name to check for.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>permissionValue</td>
    <td>String representation of an integer value representing the permission value to check for.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>resourceName</td>
    <td>String value for the name of the resource to check permissions for.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>resourceType</td>    
    <td>String representation of an integer value identifying the resource type to check permissions for. See the <a href="{{< relref "user-guide/process-engine/authorization-service.md#resources" >}}">User Guide</a> for a list of integer representations of resource types.</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>The id of the resource to check permissions for. If left blank, a check for global permissions on the resource is performed.</td>
    <td>No</td>
  </tr> 
</table>


Result
------

A JSON array with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>permissionName</td>
    <td>String</td>
    <td>Name of the permission which was checked.</td>
  </tr>
  <tr>
    <td>resourceName</td>
    <td>String</td>
    <td>The name of the resource for which the permission check was performed.</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>String</td>
    <td>The id of the resource for which the permission check was performed.</td>
  </tr> 
  <tr>
    <td>isAuthorized</td>
    <td>Boolean</td>
    <td>True / false for isAuthorized.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Authorization with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/authorization/check?permissionName=READ,permissionValue=2,resourceName=USER,resourceType=1,resourceId=jonny`
  
#### Response

Status 200.

    {"permissionName": "READ",
     "resourceName": "USER",
     "resourceId": "jonny",
     "isAuthorized": true}
