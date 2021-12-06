---

title: 'Cookie Security'
weight: 20
layout: "single"

menu:
  main:
    identifier: "cookie-security"
    parent: "webapps-shared-options"
    pre: "Get more insights about cookie security settings"
---

Camundas Web applications use cookies to preserve user sessions and to prevent CSRF attacks. This page explains how these cookies should be configured to increase the security.

The Web applications set the following cookies:

* **Session Cookie** (<code>JSESSIONID</code>)
  * Supposed to remember the authenticated user after the login
* **CSRF Prevention Cookie** (<code>XSRF-TOKEN</code>)
  * Supposed to prevent Cross-Site Request Forgery (CSRF) by sending a newly generated token along with each modifying request

## What are the properties supposed to be?

This section describes the purpose of security-related cookie properties. You can find more information about 
[Secure and HttpOnly](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies)
as well as 
[SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#samesite_attribute)
in Mozilla’s Developer Guide.

### Secure

When enabling the <code>Secure</code> flag, the browser does not send the cookie via a plain (insecure) HTTP connection.

To provide a seamless getting started experience, we disabled the <code>Secure</code> flag by default for all cookies. However, you can easily enable the <code>Secure</code> flag. When the Secure flag is present, some browsers prevent cookies from being sent via a plain (insecure) HTTP connection.

{{< note title="Heads-up!" class="info" >}}
It is highly recommended to use an HTTPS connection and enable the <code>Secure</code> flag.
{{< /note >}}

### HttpOnly

When enabling the <code>HttpOnly</code> flag, the cookie cannot be read via JavaScript to mitigate cross-site scripting (XSS) attacks.

### SameSite

When enabling the <code>SameSite</code> flag, the browser only sends the cookie if the client performs the request from the same domain that initially set the cookie. In case of a cross-site request, the browser will not send the cookie.

{{< note title="Heads-up!" class="info" >}}
The standard related to <code>SameSite</code> recently changed. Most current browser versions treat cookies without <code>SameSite</code> attributes as 'SameSite=Lax'.
Have a look at [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#samesite_attribute) in Mozilla’s Developer Guide.
{{< /note >}}

## What are the limitations?

The following section lists the limitations of the cookie security settings.

### Absence of HttpOnly for the CSRF Cookie
For the CSRF Cookie, the <code>HttpOnly</code> flag is absent and not configurable to ensure the functionality of the Web applications. Aforementioned is due to the reason that the CSRF cookie must be readable by the JavaScript HTTP Client to guarantee that the browser sends the token along with every modifying request.

### Absence of SameSite for the Session Cookie
In the following [pre-packaged distributions]({{< ref "/installation/full/_index.md" >}}), the <code>SameSite</code> property is absent by default since the Java Container manages the cookie and the latest Servlet specification does currently not support the <code>SameSite</code> property:

* JBoss EAP/WildFly
* IBM WebSphere
* Oracle Weblogic

For all other distributions, the <code>SameSite</code> flag is enabled by default.

{{< note title="Heads-up!" class="info" >}}
The absence of the <code>SameSite</code> property does not have any negative impact on the security of the Web applications: The <code>SameSite</code> property is supposed to ensure protection from CSRF attacks. With the CSRF Protection Filter, there already exists a dedicated protection mechanism for such scenarios.
{{< /note >}}

## What are the defaults?

The following table shows the default configuration of the Web applications.

<table class="table table-striped">
  <tr>
    <th>Property Name</th>
    <th>Session Cookie</th>
    <th>CSRF Cookie</th>
  </tr>
  <tr>
    <td><code>HttpOnly</code></td>
    <td><code>true</code></td>
    <td>–</td>
  </tr>
  <tr>
    <td><code>Secure</code></td>
    <td><code>false</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>SameSite</code></td>
    <td><code>Lax *</code></td>
    <td><code>Lax *</code></td>
  </tr>
</table>

\* The <code>SameSite</code> property is not supported for IBM WebSphere and disabled by default for both cookies.
The Session Cookie also has no <code>SameSite</code> attribute by default on JBoss EAP/WildFly and Oracle Weblogic.

{{< note title="SameSite & Firefox" class="info" >}}
Firefox prevents sending the Cookie to the server for all subsequent requests until the next restart ...

* ... on **Strict** when opening the Webapps from a cross-origin (GET)
* ... on **Lax** when a modifying request (e. g. POST) is performed from a cross-origin
{{< /note >}}

## How to configure?

This section describes how to configure the **Session Cookie** as well as the **CSRF Cookie**.

### Session Cookie

Here you can find how to configure the session cookie for the following containers:

* [Tomcat]({{< ref "/installation/full/tomcat/configuration.md#session-cookie-in-webapps" >}})
* [JBoss EAP & Wildfly]({{< ref "/installation/full/jboss/configuration.md#session-cookie-in-webapps" >}})
* [IBM WebSphere Application Server]({{< ref "/installation/full/was/configuration.md#session-cookie-in-webapps" >}})
* [Oracle WebLogic Server]({{< ref "/installation/full/wls/configuration.md#session-cookie-in-webapps" >}})
* [Spring Boot]({{< ref "/user-guide/spring-boot-integration/configuration.md#session-cookie" >}})

### CSRF Cookie

In the [CSRF Prevention]({{< ref "/webapps/shared-options/csrf-prevention.md" >}}) documentation, you can find how to configure the CSRF Cookie.