Rest API Overview
==================

The goal of the REST API is to provide access to all relevant interfaces of the engine.


Structure
--------------

These documents explain all existing methods in the REST API. For each method they provide:

* An informal description
* HTTP verb and URL
* Possible query, path or message body parameters
* A detailed description of the response content
* Possible response codes
* A brief example request and response


Engine Usage
--------------

The methods as described work on the default process engine as given by the available `ProcessEngineProvider` service.

You may prepend `/engine/{name}` to any of the methods (unless otherwise documented) to access another engine. 
`name` is the name of the process engine as returned by `ProcessEngine#getName()`.


Error Handling
--------------

For every method this documentation gives possible HTTP status codes. The error code explanations do not cover all
possible error causes that may arise when the request is served. For example, most of the requests will not work properly if
there are problems with database access. <br/>

Any of these undocumented errors will be translated to a HTTP 500 error.


Authentication
--------------

For release `7.0.0.alpha2`, authentication is not part of the API yet. However, it is planned for the final release `7.0.0`.
