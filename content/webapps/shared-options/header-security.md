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

## What are the headers supposed to be?

This section briefly describes the purpose of the headers. You can find more information about the 
[XSS Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection), 
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) 
as well as [Content-Type Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options) 
header in Mozilla’s Developer Guide.

### XSS Protection

If the **XSS Protection** header is enabled some cross-site scripting (XSS) attacks are detected, and the malicious parts of the page are either sanitized, or the rendering of the page is blocked entirely.

### Content Security Policy

The **Content Security Policy** is a mighty tool to prevent cross-site scripting and code injection attacks.

It is a common practice to extend the Camunda BPM web applications by custom scripts & forms. To ensure that these user 
customizations work without any problems, by default, the **Content Security Policy** is configured very lax. It is highly 
recommended to strengthen the default policy based on your requirements.

#### Default Policy

For the default policy, only the `base-uri` directive is set to `'self'` which restricts the HTML Base Tag to point to 
the same-origin.

The header value of the default policy looks as follows:
```
base-uri 'self'
```

#### Strengthen the Default Policy

We encourage you to use a stricter **Content Security Policy** than the default policy to mitigate attacks. This section describes how to configure several directives more strict and explains the resulting impact:

* `base-uri 'self'`
  * The URI of the HTML Base Tag must not point to a cross-origin
* `default-src 'self' 'unsafe-inline'`
  * Resources (e. g. scripts, styles, fonts, etc.) must not point to a cross-origin
  * Inline styles/scripts must be allowed since the web applications make use of it
  * JavaScript's `eval(…)` calls are not executed
* `img-src 'self' data:`
  * Images must not point to a cross-origin
  * Data URIs are allowed since the web applications make use of it
* `block-all-mixed-content`
  * When accessed via HTTPS, all resources loaded via HTTP are blocked
  * Mixed content is allowed when the site is accessed via HTTP
* `form-action 'self'`
  * A form must not be submitted against a cross-origin
  * JavaScript in the <code>action</code> attribute of a form is not executed
* `frame-ancestors 'none'`
  * Embedding the web applications via an <code>iframe</code> is forbidden; Mitigates clickjacking attacks
* `object-src 'none'`
  * Resources embedded via <code>object</code>, <code>embed</code> or <code>applet</code> tags are not loaded
  * Mitigates the exploitation of bugs that are included in third-party plugins (e. g. Adobe Flash, Java Applets, etc.)
* `sandbox allow-forms allow-scripts allow-same-origin allow-popups`
  * The site is rendered inside a sandbox
  * Submitting forms, executing scripts, accessing the local storage as well as opening popups must be allowed since the web applications make use of these mechanisms

If you want to configure all of the directives introduced above, the policy would look as follows:
```
base-uri 'self';
default-src 'self' 'unsafe-inline';
img-src 'self' data:;
block-all-mixed-content;
form-action 'self';
frame-ancestors 'none';
object-src 'none';
sandbox
  allow-forms
  allow-scripts
  allow-same-origin
  allow-popups
```

{{< note title="Heads-up!" class="info" >}}
Please keep in mind that a configuration which is more strict than the one introduced above might break the functionality of the web applications.
{{< /note >}}

### Content-Type Options

If the **Content-Type Options** header is enabled, the browser uses the mime type declared in the <code>Content-Type</code> 
header to render a resource and prevents trying to guess the mime type by inspecting the actual content of the byte stream (sniffing).

## Where to Configure?

Choose a container from the list and learn where to configure the HTTP Security Headers:

* [Tomcat]({{< ref "/installation/full/tomcat/configuration.md#security-related-http-headers-in-webapps" >}})
* [JBoss AS, JBoss EAP & Wildfly]({{< ref "/installation/full/jboss/configuration.md#security-related-http-headers-in-webapps" >}})
* [IBM WebSphere Application Server]({{< ref "/installation/full/was/configuration.md#security-related-http-headers-in-webapps" >}})
* [Oracle WebLogic Server]({{< ref "/installation/full/wls/configuration.md#security-related-http-headers-in-webapps" >}})
* [Spring Boot]({{< ref "/user-guide/spring-boot-integration/configuration.md#header-security" >}})

## How to Configure?

The following table shows the possible configuration settings and the default behavior:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Attribute</th>
    <th>Configuration</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>X-XSS-Protection</code></td>
    <td><code>xssProtectionDisabled</code></td>
    <td>
      The header can be entirely disabled if set to <code>true</code>. <br>
      Allowed set of values is <code>true</code> and <code>false</code>. 
    </td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>xssProtectionOption</code></td>
    <td>
      The allowed set of values:
      <ul>
        <li><code>BLOCK</code>: If the browser detects a cross-site scripting attack, the page is blocked completely</li>
        <li><code>SANITIZE</code>: If the browser detects a cross-site scripting attack, the page is sanitized from suspicious parts (value <code>0</code>)</li>
      </ul><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>xssProtectionDisabled</code> is set to <code>true</code></li>
        <li>Cannot be set in conjunction with <code>xssProtectionValue</code></li>
      </ul>
    </td>
    <td><code>BLOCK</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>xssProtectionValue</code></td>
    <td>
      A custom value for the header can be specified.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>xssProtectionDisabled</code> is set to <code>true</code></li>
        <li>Cannot be set in conjunction with <code>xssProtectionOption</code></li>
      </ul>
    </td>
    <td><code>1; mode=block</code></td>
  </tr>
  <tr>
    <td><code>Content-Security-Policy</code></td>
    <td><code>contentSecurityPolicyDisabled</code></td>
    <td>
      The header can be entirely disabled if set to <code>true</code>. <br>
      Allowed set of values is <code>true</code> and <code>false</code>. 
    </td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>contentSecurityPolicyValue</code></td>
    <td>
      A custom value for the header can be specified.<br><br>
      <strong>Note:</strong> Property is ignored when <code>contentSecurityPolicyDisabled</code> is set to <code>true</code>
    </td>
    <td><code>base-uri 'self'</code></td>
  </tr>
  <tr>
    <td><code>X-Content-Type-Options</code></td>
    <td><code>contentTypeOptionsDisabled</code></td>
    <td>
      The header can be entirely disabled if set to <code>true</code>. <br>
      Allowed set of values is <code>true</code> and <code>false</code>. 
    </td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>contentTypeOptionsValue</code></td>
    <td>
      A custom value for the header can be specified.<br><br>
      <strong>Note:</strong> Property is ignored when <code>contentSecurityPolicyDisabled</code> is set to <code>true</code>
    </td>
    <td><code>nosniff</code></td>
  </tr>
</table>