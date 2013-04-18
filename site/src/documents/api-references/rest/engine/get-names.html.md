Get Engine Names
==================

Retrieves the names of all process engines available on your platform.

__Note:__ You cannot prepend `/engine/{name}` to this method.


Method
------

GET `/engine`


Parameters
----------

This method takes no parameters.


Result
-----------------
A json array consisting of engine objects.
Each engine object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the process engine.</td>
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
</table>


Example
-------

#### Request
  
GET `/engine`
  
#### Response

    [{"name":"default"},
     {"name":"anotherEngineName"}]