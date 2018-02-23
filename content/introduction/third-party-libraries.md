---

title: 'Third-Party Libraries'
weight: 70

menu:
  main:
    identifier: "user-guide-introduction-third-party-libraries"
    parent: "user-guide-introduction"

---

This section covers third party libraries and their use in Camunda. For each component of Camunda, the third party libraries are listed. For each library, it is explained whether the library is a _required dependency_ or an _optional dependency_.

Required dependencies are libraries Camunda depends on to provide core functionality. In the list below marked as {{< RD >}}.

Optional dependencies are libraries Camunda can be integrated with. In the list below marked as {{< OD >}}.

# Process Engine

The process engine depends on the following third-party libraries:

* [MyBatis mapping framework](http://mybatis.github.io/mybatis-3/) {{< RD >}} for object-relational mapping.
* [Joda Time](http://www.joda.org/joda-time/) {{< RD >}} for parsing date formats.
* [Java Uuid Generator (JUG)](http://wiki.fasterxml.com/JugHome) {{< OD >}} Id Generator. See the [documentation on Id-Generators][id-generator]
* [SLF4J](http://www.slf4j.org/) {{< RD >}} Logging Facade

Additionally, the process engine can be integrated with:

* [Apache Commons Email](http://commons.apache.org/proper/commons-email/) {{< OD >}} for mail task support.
* [Spring Framework Spring-Beans][spring] {{< OD >}} for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-Core][spring] {{< OD >}} for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-ASM][spring] {{< OD >}} for configuration using [camunda.cfg.xml][spring-xml].
* [Groovy](http://groovy.codehaus.org/) {{< OD >}} for groovy script task support.
* [Jython](http://www.jython.org) {{< OD >}} for Python script task support.
* [JRuby](http://jruby.org/) {{< OD >}} for Ruby script task support.
* [Freemarker](http://freemarker.org/) {{< OD >}} for freemarker template engine support.
* [Apache Velocity](http://velocity.apache.org/) {{< OD >}} for apache velocity template engine support.
* [SAXON](http://saxon.sourceforge.net/) {{< OD >}} for XSLT and XQuery template engine support.


# REST API

The REST API depends on the following third-party libraries:

* [Jackson JAX-RS](http://wiki.fasterxml.com/JacksonHome) {{< RD >}} provider for JSON content type
* [Apache Commons FileUpload](http://commons.apache.org/proper/commons-fileupload/) {{< RD >}}

Additionally, when using Apache Tomcat:

* [RESTEasy](http://www.jboss.org/resteasy) {{< RD >}}


# Spring Support

The Spring support can be integrated with the following third-party libraries:

* [Apache Commons DBCP](http://commons.apache.org/proper/commons-dbcp/) {{< OD >}}
* [Apache Commons Lang](http://commons.apache.org/proper/commons-lang/) {{< OD >}}
* [Spring Framework Spring-Beans][spring] {{< OD >}}
* [Spring Framework Spring-Core][spring] {{< OD >}}
* [Spring Framework Spring-ASM][spring] {{< OD >}}
* [Spring Framework Spring-Context][spring] {{< OD >}}
* [Spring Framework Spring-JDBC][spring] {{< OD >}}
* [Spring Framework Spring-ORM][spring] {{< OD >}}
* [Spring Framework Spring-TX][spring] {{< OD >}}

# Camunda Spin

Camunda Spin depends on the following third-party libraries:

* [Jackson Json](http://wiki.fasterxml.com/JacksonHome) {{< RD >}} for Json Dataformat Support

Additionally, Camunda Spin can be integrated with the following libraries:

* [Jayway Json Path](http://code.google.com/p/json-path/) {{< OD >}} for Json Path Support

# Camunda Connect

Camunda Connect depends on the following third-party libraries:

* [Apache Http Components](http://wiki.fasterxml.com/JacksonHome) {{< RD >}} for REST and SOAP support.


[spring]: http://projects.spring.io/spring-framework/
[spring-xml]: {{< relref "user-guide/process-engine/process-engine-bootstrapping.md#configure-process-engine-using-spring-xml" >}}
[id-generator]: {{< relref "user-guide/process-engine/id-generator.md" >}}
