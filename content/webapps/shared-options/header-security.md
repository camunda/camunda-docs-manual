---

title: 'HTTP Header Security'
weight: 20
layout: "single"

menu:
  main:
    identifier: "http-header-security"
    parent: "webapps-shared-options"
    pre: "A HTTP Header Security Filter for the Camunda Web Applications"
---

The HTTP Header Security mechanism allows you to add security-related response headers which enable browser-side security mechanisms.

## XSS Protection
If the **XSS Protection** header is enabled some cross-site scripting (XSS) attacks are detected, and the malicious parts of the page are either sanitized, or the rendering of the page is blocked entirely.

## Where to Configure?

Choose a container from the list and learn where to configure the HTTP Security Headers:

* [Tomcat]({{< ref "/installation/full/tomcat/configuration.md#security-related-http-headers-in-webapps" >}})
* [JBoss AS, JBoss EAP & Wildfly]({{< ref "/installation/full/jboss/configuration.md#security-related-http-headers-in-webapps" >}})
* [IBM WebSphere Application Server]({{< ref "/installation/full/was/configuration.md#security-related-http-headers-in-webapps" >}})
* [Oracle WebLogic Server]({{< ref "/installation/full/wls/configuration.md#security-related-http-headers-in-webapps" >}})
* [Spring Boot]({{< ref "/user-guide/spring-boot-integration/configuration.md#header-security" >}})

## How to Configure?

The following table shows the possible configuration options and the default behavior:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Attribute</th>
    <th>Configuration</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>X-XSS-Protection</code></td>
    <td><code>xssProtectionOption</code></td>
    <td>
      The allowed set of values:
      <ul>
        <li><code>BLOCK</code>: If the browser detects a cross-site scripting attack, the page is blocked completely</li>
        <li><code>SANITIZE</code>: If the browser detects a cross-site scripting attack, the page is sanitized from suspicious parts (value <code>0</code>)</li>
      </ul>
    </td>
    <td><code>BLOCK</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>xssProtectionDisabled</code></td>
    <td>
      The header can be entirely disabled if set to <code>true</code>. <br>
      Allowed set of values is <code>true</code> and <code>false</code>. 
    </td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>xssProtectionValue</code></td>
    <td>A custom value for the header can be specified.</td>
    <td><code>1; mode=block</code></td>
  </tr>
</table>

For further reading on how the XSS protection header works in detail, 
please see [Mozillas MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection).