---

title: 'Embedding the API'
category: 'Overview'

---


The REST API is an artifact of its own, which means that it can be embedded in any other JAX-RS application independently of the engine.

Prerequisites
--------------

The REST API classes are tested with [Resteasy](http://www.jboss.org/resteasy/), [Jersey](http://jersey.java.net/) and [Wink](http://wink.apache.org/) as the JAX-RS implementation.
Furthermore, the engine classes and Jackson's `org.codehaus.jackson:jackson-jaxrs` artifact have to be on the classpath.

Required steps
--------------

*   Add the REST API to your project as a Maven dependency.

    ```xml
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-rest</artifactId>
      <classifier>classes</classifier>
      <version>7.0.0-Final</version>
    </dependency>
    ```

*   Add the REST resources that you need to your JAX-RS application. Example:

    ```java
    @ApplicationPath("/")
    public class MyApplication extends Application {
      @Override
      public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        // add your own classes 
        ...
        // add all camunda engine rest resources (or just add those that you actually need).
        classes.addAll(CamundaRestResources.getResourceClasses());

        // mandatory
        classes.addAll(CamundaRestResources.getConfigurationClasses());
        
        return classes;
      }
    }
    ```

    The `org.camunda.bpm.engine.rest.*RestServiceImpl` classes contain the methods as structured in this documentation. 
    `ProcessEngineRestServiceImpl` adds the functionality that different engines may be addressed.
    If it is not included, the default engine will always be used and `/engine/{name}` URLs will not be available.
    
    `JacksonConfigurator` is required to correctly configure the serialization of date fields.
    You may also have to add the following Jackson providers: `org.codehaus.jackson.jaxrs.JacksonJsonProvider`,
    `org.codehaus.jackson.jaxrs.JsonMappingExceptionMapper` and `org.codehaus.jackson.jaxrs.JsonParseExceptionMapper`.
    Depending on the runtime environment, this may not be necessary. 
    On JBoss AS 7 these should be automatically added as an implicit module dependency.
  
    For proper exception responses of the format as described in the [Introduction](ref:#overview-introduction),
    it is necessary to include `RestExceptionHandler`. `ProcessEngineExceptionHandler` is used to translate any exception thrown by the
    engine that is not explicitly handled by the REST API classes to a generic HTTP 500 error with the same response body format.
    If you would like to have all kinds of exceptions translated to this format, you can use `org.camunda.bpm.engine.rest.exception.ExceptionHandler` instead of `ProcessEngineExceptionHandler`.
  
    Next is the wiring of the REST API and the process engine(s). 
    To do this, you must create a Service Provider that implements the interface `ProcessEngineProvider`
    and declare it in a file `META-INF/services/org.camunda.bpm.engine.rest.spi.ProcessEngineProvider`.
    You may also declare the class `org.camunda.bpm.engine.rest.impl.application.ContainerManagedProcessEngineProvider` 
    which comes with the REST API and uses the methods that the class `org.camunda.bpm.BpmPlatform` provides.