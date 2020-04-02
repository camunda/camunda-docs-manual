---

title: 'Container-Based Authentication'
weight: 10

menu:
  main:
    identifier: "webapps-container-based-authentication"
    parent: "webapps-shared-options"
    pre: "Get more insights about enabling Container Based Authentication and SSO"
---


# What Is Container-Based Authentication?

Camunda supports a broad range of containers, including Tomcat, JBoss, Wildfly, IBM WebSphere and Oracle WebLogic. Using Container-Based Authentication, it is possible to move the authentication action to the container level, which will then make the authentication result available to the Camunda Web Applications.

# Enabling Container-Based Authentication

The Container-Based Authentication implementation for the Web Applications is switched off by default, but can be activated by adding a servlet filter in the `web.xml` as follows:

```xml
  <!-- Container Based Authentication filter -->
  <filter>
    <filter-name>Container Based Authentication Filter</filter-name>
    <filter-class>org.camunda.bpm.webapp.impl.security.auth.ContainerBasedAuthenticationFilter</filter-class>
    <init-param>
      <param-name>authentication-provider</param-name>
      <param-value>org.camunda.bpm.engine.rest.security.auth.impl.ContainerBasedAuthenticationProvider</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>Container Based Authentication Filter</filter-name>
    <url-pattern>/*</url-pattern>
    <dispatcher>REQUEST</dispatcher>
  </filter-mapping>
```

# Container-Based Authentication for Single Sign-On

The Camunda Web Applications can also integrate with a [Single Sign-On implementation](https://en.wikipedia.org/wiki/List_of_single_sign-on_implementations) when the Container-Based Authentication servlet filter is enabled.