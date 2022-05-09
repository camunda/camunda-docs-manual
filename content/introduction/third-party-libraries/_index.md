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

For legal reference please refer to [Licences][licenses].

# Process Engine

The process engine depends on the following third-party libraries:

* [MyBatis mapping framework](http://mybatis.github.io/mybatis-3/) {{< RD >}} for object-relational mapping.
* [Joda Time](http://www.joda.org/joda-time/) {{< RD >}} for parsing date formats.
* [Java Uuid Generator (JUG)](https://github.com/FasterXML/jackson) {{< OD >}} Id Generator. See the [documentation on Id-Generators][id-generator]
* [SLF4J](http://www.slf4j.org/) {{< RD >}} Logging Facade

Additionally, the process engine can be integrated with:

* [Apache Commons Email](http://commons.apache.org/proper/commons-email/) {{< OD >}} for mail task support.
* [Spring Framework Spring-Beans][spring] {{< OD >}} for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-Core][spring] {{< OD >}} for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-ASM][spring] {{< OD >}} for configuration using [camunda.cfg.xml][spring-xml].
* [Groovy](http://groovy-lang.org/) {{< OD >}} for groovy script task support.
* [Jython](http://www.jython.org) {{< OD >}} for Python script task support.
* [JRuby](http://jruby.org/) {{< OD >}} for Ruby script task support.
* [Freemarker](http://freemarker.org/) {{< OD >}} for freemarker template engine support.
* [Apache Velocity](http://velocity.apache.org/) {{< OD >}} for apache velocity template engine support.
* [SAXON](http://saxon.sourceforge.net/) {{< OD >}} for XSLT and XQuery template engine support.


# REST API

The REST API depends on the following third-party libraries:

* [Jackson JAX-RS](https://github.com/FasterXML/jackson) {{< RD >}} provider for JSON content type
* [Apache Commons FileUpload](http://commons.apache.org/proper/commons-fileupload/) {{< RD >}}

Additionally, when using Apache Tomcat:

* [RESTEasy](http://www.jboss.org/resteasy) {{< RD >}}


# Web Applications (Cockpit, Tasklist, Admin)

Find a full list of third-party Javascript libraries and their licenses in the [license book]({{< ref "/introduction/third-party-libraries/camunda-bpm-platform-license-book.md#camunda-web-applications-javascript-dependencies" >}}). 

## XLTS for AngularJS

Starting with versions 7.18.0-alpha2, 7.17.2, 7.16.9, 7.15.15, the Camunda web applications use a set of third-party libraries referred to as *XLTS for AngularJS* (technical names: `angular`, `angular-animate`, `angular-cookies`, `angular-loader`, `angular-mocks`, `angular-resource`, `angular-route`, `angular-sanitize`, `angular-touch`). XLTS for AngularJS follows a proprietary license called *EULA for the downstream recipient of XLTS for AngularJS* (short *XLTS for AngularJS – EULA*) that you can find at: https://xlts.dev/angularjs/downstream-eula. 

Especially, the license imposes restrictions around distributing and reverse-engineering XLTS for AngularJS independently of Camunda artifacts. The license does otherwise not restrict how you can use and distribute the Camunda artifacts that include XLTS for AngularJS. You can find our rationale for using this library in [our blog post on ensuring the long-term maintenance of Camunda Platform 7](https://camunda.com/blog/2022/02/ensuring-continuous-support-of-angularjs-in-camunda-platform-7-17/).


# Spring Support

The Spring support can be integrated with the following third-party libraries:

* [Apache Commons DBCP](http://commons.apache.org/proper/commons-dbcp/) {{< OD >}}
* [Spring Framework Spring-Beans][spring] {{< OD >}}
* [Spring Framework Spring-Core][spring] {{< OD >}}
* [Spring Framework Spring-ASM][spring] {{< OD >}}
* [Spring Framework Spring-Context][spring] {{< OD >}}
* [Spring Framework Spring-JDBC][spring] {{< OD >}}
* [Spring Framework Spring-ORM][spring] {{< OD >}}
* [Spring Framework Spring-TX][spring] {{< OD >}}

# Camunda Spin

Camunda Spin depends on the following third-party libraries:

* [Jackson Json](https://github.com/FasterXML/jackson) {{< RD >}} for Json Dataformat Support

Additionally, Camunda Spin can be integrated with the following libraries:

* [Jayway Json Path](http://code.google.com/p/json-path/) {{< OD >}} for Json Path Support

# Camunda Connect

Camunda Connect depends on the following third-party libraries:

* [Apache Http Components](https://github.com/FasterXML/jackson) {{< RD >}} for REST and SOAP support.


[spring]: http://projects.spring.io/spring-framework/
[spring-xml]: {{< ref "/user-guide/process-engine/process-engine-bootstrapping.md#configure-process-engine-using-spring-xml" >}}
[id-generator]: {{< ref "/user-guide/process-engine/id-generator.md" >}}
[licenses]: {{< ref "/introduction/licenses.md" >}}
