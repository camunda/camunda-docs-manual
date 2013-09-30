---

title: 'Embedding the API'
category: 'Overview'

---


The REST API is an artifact of its own, which means that it can be embedded in any other JAX-RS application independently of the engine.

Prerequisites
--------------

The REST API classes are tested with [Resteasy](http://www.jboss.org/resteasy/), [Jersey](http://jersey.java.net/) and [Wink](http://wink.apache.org/) as the JAX-RS implementation.
Furthermore the engine classes and Jackson's `org.codehaus.jackson:jackson-jaxrs` artifact have to be on the classpath.

Required steps
--------------

*   Add the REST API as a Maven dependency to your project.

    ```xml
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-rest</artifactId>
      <classifier>classes</classifier>
      <version>7.0.0-Final</version>
    </dependency>
    ```

*   Add those REST resources to your JAX-RS application that you need. Example:

    ```java
    @ApplicationPath("/")
    public class MyApplication extends Application {
      @Override
      public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        // add your own classes 
        ...
        // add camunda engine rest classes that you need
        classes.add(org.camunda.bpm.engine.rest.impl.ProcessEngineRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.ProcessDefinitionRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.ProcessInstanceRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.TaskRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.IdentityRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.MessageRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.JobRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.ExecutionRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.VariableInstanceRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.UserRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.GroupRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.AuthorizationRestServiceImpl.class);
        classes.add(org.camunda.bpm.engine.rest.impl.history.HistoryRestServiceImpl.class);
        // mandatory
        classes.add(org.camunda.bpm.engine.rest.mapper.JacksonConfigurator.class);
        classes.add(org.camunda.bpm.engine.rest.exception.RestExceptionHandler.class);
        classes.add(org.camunda.bpm.engine.rest.exception.ProcessEngineExceptionHandler.class);
        return classes;
      }
    }
    ```

    The classes `org.camunda.bpm.engine.rest.*RestServiceImpl` classes contain the methods as structured in this documentation. 
    `ProcessEngineRestServiceImpl` adds the functionality that different engines may be addressed.
    If it is not included the default engine will always be used and `/engine/{name}` URLs will not be available.
    
    `JacksonConfigurator` is required to configure the serialization of date fields correctly.
    You may also have to add the following Jackson providers: `org.codehaus.jackson.jaxrs.JacksonJsonProvider`,
    `org.codehaus.jackson.jaxrs.JsonMappingExceptionMapper` and `org.codehaus.jackson.jaxrs.JsonParseExceptionMapper`.
    Depending on the runtime environment, this may not be necessary. 
    On JBoss AS 7 these should be automatically added as an implicit module dependency.
  
    For proper exception responses of the format as described in the [Introduction](#overview-introduction),
    it is required to include `RestExceptionHandler`. `ProcessEngineExceptionHandler` is used to translate any exception thrown by the
    engine that is not explicitly handled by the REST API classes to a generic HTTP 500 error with the same response body format.
    If you would like to have all kinds of exceptions translated to this format, you can use `org.camunda.bpm.engine.rest.exception.ExceptionHandler` instead of `ProcessEngineExceptionHandler`.
  
    Next is the wiring of the REST API and the process engine(s). 
    This requires to create a Service Provider that implements the interface `ProcessEngineProvider`
    and declare it in a file `META-INF/services/org.camunda.bpm.engine.rest.spi.ProcessEngineProvider`.
    You may also declare the class `org.camunda.bpm.engine.rest.impl.application.ContainerManagedProcessEngineProvider` 
    which comes with the REST API and uses the methods the class `org.camunda.bpm.BpmPlatform` provides.