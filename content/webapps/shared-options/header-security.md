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

## What is HTTP Header Security?
The HTTP Header Security allows to add security-related headers to the HTTP response body 
and enables browser-side security mechanisms. 

## Where to Find?
It is implemented with the help of a servlet filter and enabled by default for the Webapps. 

The HTTP Header Security Filter can be configured (or disabled entirely) in the `web.xml` of the Webapps:

```xml 
<!-- HTTP Header Security Filter -->
<filter>
  <filter-name>HttpHeaderSecurity</filter-name>
  <filter-class>
    org.camunda.bpm.webapp.impl.security.filter.headersec.HttpHeaderSecurityFilter
  </filter-class>
  
  <init-param>
    <param-name>xssProtectionDisabled</param-name>
    <param-value>false</param-value>                  <!-- default value -->
    
    <param-name>xssProtectionOption</param-name>
    <param-value>BLOCK</param-value>                  <!-- default value -->
  </init-param>
</filter>

<filter-mapping>
  <filter-name>HttpHeaderSecurity</filter-name>
  <url-pattern>/*</url-pattern>
  <dispatcher>REQUEST</dispatcher>
</filter-mapping>
```

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