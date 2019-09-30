---

title: 'CSRF Prevention'
weight: 20
layout: "single"

menu:
  main:
    identifier: "webapps-csrf-prevention"
    parent: "webapps-shared-options"
    pre: "A CSRF-Prevention Filter for the Camunda Web Applications"
---

A CSRF filter is enabled by default, validating each modifying request performed through the webapps. The filter implements a (per-session) _Synchronization Token_ method for CSRF validation with an optional _Same Origin with Standard Headers_ verification.

In Spring Boot Starter, the configuration needs to be made in the `application.yaml`.
Please read more about it [here]({{< ref "/user-guide/spring-boot-integration/configuration.md#csrf" >}}).

If you would like to enable the additional _Same Origin with Standard Headers_ verification, the `targetOrigin` init-parameter should be set in the `web.xml` file of your application. That, and some additional optional initialization parameters are:

```xml
  <!-- CSRF Prevention filter -->
  <filter>
    <filter-name>CsrfPreventionFilter</filter-name>
    <filter-class>org.camunda.bpm.webapp.impl.security.filter.CsrfPreventionFilter</filter-class>
    <init-param>
      <param-name>targetOrigin</param-name>
      <param-value>http://example.com</param-value>
    </init-param>
    <init-param>
      <param-name>denyStatus</param-name>
      <param-value>404</param-value>
    </init-param>
    <init-param>
      <param-name>randomClass</param-name>
      <param-value>java.security.SecureRandom</param-value>
    </init-param>
    <init-param>
      <param-name>entryPoints</param-name>
      <param-value>/api/engine/engine/default/history/task/count, /api/engine/engine/default/history/variable/count</param-value>
    </init-param>
    <init-param>
      <param-name>enableSecureCookie</param-name>
      <param-value>true</param-value>               <!-- default value is false -->
    </init-param>
    <init-param>
      <param-name>enableSameSiteCookie</param-name>
      <param-value>true</param-value>               <!-- default value is true -->
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>CsrfPreventionFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>targetOrigin</td>
    <td>Application expected deployment domain: the domain name through which the webapps are accessed. If nothing is set, the <i>Same Origin with Standard Headers</i> verification is not performed.</td>
  </tr>
  <tr>
    <td>denyStatus</td>
    <td>HTTP response status code that is used when rejecting denied request. The default value is 403.</td>
  </tr>
  <tr>
    <td>randomClass</td>
    <td>The name of the class to use to generate tokens. The class must be an instance of `java.util.Random`. If not set, the default value of `java.security.SecureRandom` will be used.</td>
  </tr>
  <tr>
    <td>entryPoints</td>
    <td>Entry points are URLs that will not be tested for the presence of a valid token. They are used to provide a way to navigate back to the protected apps after navigating away from them.</td>
  </tr>
  <tr>
    <td>enableSecureCookie</td>
    <td>
      If set to <code>true</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#secure" >}}">Secure</a> is enabled.<br>
      The default value is <code>false</code>.
    </td>
  </tr>
  <tr>
    <td>enableSameSiteCookie</td>
    <td>
      If set to <code>false</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#samesite" >}}">SameSite</a> is disabled.<br>
      The default value is <code>true</code>.
      The default value of the <code>SameSite</code> cookie is <code>LAX</code> and it can be changed via <code>sameSiteCookieOption</code> configuration property.
    </td>
  </tr>
  <tr>
    <td>sameSiteCookieOption</td>
    <td>
      Can be configured either to <code>STRICT</code> or <code>LAX</code>.<br>
      <strong>Note:</strong> This property is ignored when <code>enableSameSiteCookie</code> is set to <code>false</code>.
    </td>
  </tr>
  <tr>
    <td>sameSiteCookieValue</td>
    <td>
      A custom value for the cookie property.<br>
      <strong>Note:</strong> This property is ignored when <code>enableSameSiteCookie</code> is set to <code>false</code>.
    </td>
  </tr>
  <tr id="cookie-name">
    <td>cookieName</td>
    <td>
      A custom value to change the cookie name.<br>
      The default value is <code>XSRF-TOKEN</code>.<br>
      <strong>Note:</strong> Please make sure to additionally change the cookie name for each webapp 
      (e. g. <a href="{{< ref "/webapps/cockpit/extend/configuration.md#change-csrf-cookie-name" >}}">Cockpit
      </a>) separately.
    </td>
  </tr>
</table>