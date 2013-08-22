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

You may prepend `/engine/{name}` to any of the methods (unless otherwise documented) to access another engine. `name` is the name of the process engine as returned by `ProcessEngine#getName()`.


Error Handling
--------------

For every method this documentation gives possible HTTP status codes. The error code explanations do not cover all possible error causes that may arise when the request is served. For example, most of the requests will not work properly if there are problems with database access. Any of these undocumented errors will be translated to a HTTP 500 error.

All errors also provide a JSON response body of the form `{"type" : "SomeExceptionClass", "message" : "a detailed message"}.`

Authorization Exceptions
------------------------

If an already authenticated user interacts with a resource in an unauthorized way, the status code of the response will be set to `403, Forbidden` and details about the unauthorized interaction are provided in the response body:

    {"type" : "AuthorizationException", 
     "message" : "The user with id 'jonny' does not have 'DELETE' permission on resource 'Mary' of type 'User'.",
     "userId" : "jonny",
     "permissionName" : "DELETE",
     "resourceName" : "User",
     "resourceId" : "Mary"}

Authentication
--------------

The REST API ships with an implementation of [Http Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). By default it is switched off, but can be activated by adding a servlet filter as follows:

    <filter>
      <filter-name>camunda-auth</filter-name>
      <filter-class>
        org.camunda.bpm.engine.rest.security.auth.ProcessEngineAuthenticationFilter
      </filter-class>
      <init-param>
        <param-name>authentication-provider</param-name>
        <param-value>org.camunda.bpm.engine.rest.security.auth.impl.HttpBasicAuthenticationProvider</param-value>
      </init-param>
    </filter>
        
    <filter-mapping>
      <filter-name>camunda-auth</filter-name>
      <url-pattern>/*</url-pattern>
    </filter-mapping>
    
Any engine-specific request will then be authenticated against that engine's identity service. The GET `/engine` request that supplies a list of all avaialable process engines is the only request that does not require authentication. Any request that does not address a specific engine (i.e. it is not of the form `/engine/{name}/...`) will be authenticated against the default engine.

In the pre-built distributions, the engine authentication is switched off by default. You may have a look at the distribution's `web.xml` file and remove the comment markers from the above mentioned filter declaration to activate authentication.

Note that Http Basic Authentication *does not provide encryption* and should be secured by an SSL connection.

The authentication provider is exchangeable. You can implement the interface `org.camunda.bpm.engine.rest.security.auth.AuthenticationProvider` to realize another authentication method and change the filter's initialization parameter accordingly.
