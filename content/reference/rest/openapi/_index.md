---

title: "OpenAPI documentation"
weight: 15
layout: "single"

menu:
  main:
    identifier: "rest-api-openapi"
    parent: "rest-api"

---


Camunda REST API has partial OpenAPI documentation that follows
[OpenAPI Specification 3.0.2](https://github.com/OAI/OpenAPI-Specification/blob/3.0.2/versions/3.0.2.md) [*]
allowing client generation in different languages.

[*] _OpenAPI Specification defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection._

# Coverage

The documentation is not complete, and it contains only the basic endpoints that are needed for a minimal REST API usage:

* Condition
* Deployment
* Engine
* External Task
* Message
* Metrics
* Process Instance
* Process Definition
* Signal
* Schema Log
* Task
* Version

# Format
The documentation is shipped as a single `openapi.json` file archived in a jar artifact.
Download the Camunda REST API artifact containing the OpenAPI documentation [here](https://app.camunda.com/nexus/repository/camunda-bpm/org/camunda/bpm/camunda-engine-rest-openapi/7.13.0-alpha4/camunda-engine-rest-openapi-7.13.0-alpha4.jar).


# Client Generation
To generate REST API client in the language of your preference based on the OpenAPI documentation, you will need a client generator library,
e.g. [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) or any other library that 
is compatible with OpenAPI Specification 3.0.

To use the OpenAPI Generator, you will need Java [*]. Here is an example of how to generate C# client, once you download the library:

```
java -jar openapi-generator-cli-VERSION.jar generate -i $PATH_TO_OPENAPI/openapi.json -g csharp-netcore -o OUTPUT_DIR
```

[*] _If you need to install Java Runtime Environment, you can [find the download from Oracle here](https://www.oracle.com/java/technologies/javase-downloads.html)._

# Try it out

Instead of client generation, you can use one of the OpenAPI editors to play around with the REST API endpoints.

For example, go to [Swagger Editor](https://editor.swagger.io/) and paste the content of the openapi.json on the left-hand side in the editor.
Start a Process engine with enabled cross-origin requests, and you will be able to execute requests from the editor.