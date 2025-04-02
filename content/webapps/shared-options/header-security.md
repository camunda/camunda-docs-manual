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
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy),
[Content-Type Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)  
as well as [Strict Transport Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) 
header in Mozilla’s Developer Guide.

### XSS Protection

If the **XSS Protection** header is enabled some cross-site scripting (XSS) attacks are detected, and the malicious parts of the page are either sanitized, or the rendering of the page is blocked entirely.

### Content Security Policy

The **Content Security Policy** is a mighty tool to prevent cross-site scripting and code injection attacks.

It is a common practice to extend Camunda 7 web applications by custom scripts and forms.
Our default **Content Security Policy** defines some exceptions to ensure our web apps, your embedded forms, and embedded form scripts work out of the box.

#### Default Policy

The header value of the default policy looks as follows:
```
base-uri 'self';
script-src $NONCE 'strict-dynamic' 'unsafe-eval' https: 'self' 'unsafe-inline';
style-src 'unsafe-inline' 'self';
default-src 'self';
img-src 'self' data:;
block-all-mixed-content;
form-action 'self';
frame-ancestors 'none';
object-src 'none';
sandbox allow-forms allow-scripts allow-same-origin allow-popups allow-downloads;
```
Where `$NONCE` is a placeholder that is replaced by a random generated secure string.
This nonce can be then used to enable inline scripts in the `index.html` pages using another placeholder called `$CSP_NONCE`:
```html
<script type="application/javascript" nonce="$CSP_NONCE">
```

{{< note title="Heads-up!" class="info" >}}
If you have custom inline scripts defined, make sure to add the aforementioned `nonce` attribute to
the script tag, otherwise they will be ignored by the browser.
{{< /note >}}

#### Policy Details

We encourage you to use a strict **Content Security Policy**.
This section describes what our default policy contains: 

* `base-uri 'self'`
  * The URI of the HTML Base Tag must not point to a cross-origin
* `script-src $NONCE 'strict-dynamic' 'unsafe-eval' https: 'self' 'unsafe-inline';`
  * The browser only executes inline scripts that are explicitly whitelisted by adding a backend generated `nonce` to each script tag included in the `index.html` asset.
  * JavaScript's `eval(…)` calls must be allowed to execute `cam-script` in Tasklist.
     * If there are no embedded forms in your application, it's recommended to remove the `'unsafe-eval'` directive.
  * The second part (`https: 'self' 'unsafe-inline'`) is a fallback for browsers that don't support `strict-dynamic` yet (non CSP3 compliant browser).
     * Script resources must not point to a cross-origin.
     * Inline scripts must be allowed since the web applications make use of it.
* `style-src 'unsafe-inline' 'self'`
  * Style resources must not point to a cross-origin.
  * Inline styles must be allowed since the web applications make use of it.
* `default-src 'self'`
  * Any other unspecified resources must not point to a cross-origin.
* `img-src 'self' data:`
  * Images must not point to a cross-origin.
  * Data URIs are allowed since the web applications make use of it.
* `block-all-mixed-content`
  * When accessed via HTTPS, all resources loaded via HTTP are blocked.
  * Mixed content is allowed when the site is accessed via HTTP.
* `form-action 'self'`
  * A form must not be submitted against a cross-origin.
  * JavaScript in the <code>action</code> attribute of a form is not executed.
* `frame-ancestors 'none'`
  * Embedding the web applications via an <code>iframe</code> is forbidden; mitigates clickjacking attacks.
* `object-src 'none'`
  * Resources embedded via <code>object</code>, <code>embed</code> or <code>applet</code> tags are not loaded.
  * Mitigates the exploitation of bugs that are included in third-party plugins (e.g. Adobe Flash, Java Applets, etc.)
* `sandbox allow-forms allow-scripts allow-same-origin allow-popups allow-downloads`
  * The site is rendered inside a sandbox.
  * Submitting forms, executing scripts, accessing the local storage, opening popups as well as downloading files must be allowed since the web applications make use of these mechanisms.

{{< note title="Heads-up!" class="info" >}}
Keep in mind a stricter configuration than the one introduced above might break the functionality of the web applications.
{{< /note >}}

### Content-Type Options

If the **Content-Type Options** header is enabled, the browser uses the mime type declared in the <code>Content-Type</code> 
header to render a resource and prevents trying to guess the mime type by inspecting the actual content of the byte stream (sniffing).

### Strict Transport Security

When enabled, the browser remembers that the Webapps must be accessed via HTTPS. After the initial
HTTPS request, all subsequent requests will be redirected to HTTPS on the client-level — even though
the user tries to access the Webapps via HTTP.

{{< note title="Heads-up!" class="info" >}}
* The **Strict Transport Security** header is disabled by default. When going into production, it is highly
  recommended to enable **Strict Transport Security** and [Strengthen the Base Configuration](#strengthen-the-base-configuration) 
  to protect the Webapps against man-in-the-middle attacks.
* When accessing the Webapps via HTTP, the **Strict Transport Security** header is ignored. Therefore, 
  make sure to redirect HTTP requests to HTTPS.
{{< /note >}}

#### Base Configuration

After enabling the **Strict Transport Security** header, the base configuration is relatively lax:

```
max-age=31536000
```

#### Strengthen the Base Configuration

We encourage you to use a stricter configuration. Here you can find hints on how to strengthen 
the Base Configuration. Please also see the section on [How to Configure?](#hsts-config)

**Max Age**

The higher the value, the better: after expiration, the Webapps can be accessed via HTTP, which is 
prone to be exploited by attackers.
  
**Include Subdomains**

If you can answer the questions below with **yes**, you should consider enabling the `includeSubdomains` flag:

* Are the Webapps the only web services provided under your domain? 
* Additionally to the main domain, are there any subdomains redirected to the Webapps 
  (e.g., `www.example.com` is redirected to `example.com`)?

**Preload**

To even avoid the initial HTTP request (redirected to HTTPS), you can submit your domain to the 
[Preload List Service](https://hstspreload.org/) maintained by Google and set the 
**Strict Transport Security** header according to the 
[Submission Requirements](https://hstspreload.org/#submission-requirements) with the help of 
the config property <code>hstsValue</code>.

## Where to Configure?

Choose a container from the list and learn where to configure the HTTP Security Headers:

* [Tomcat]({{< ref "/installation/full/tomcat/configuration.md#security-related-http-headers-in-webapps" >}})
* [JBoss EAP & Wildfly]({{< ref "/installation/full/jboss/configuration.md#security-related-http-headers-in-webapps" >}})
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
  <tr>
    <td id="hsts-config"><code>Strict-Transport-Security</code></td>
    <td><code>hstsDisabled</code></td>
    <td>
      Set to <code>false</code> to enable the header. The header is disabled by default. <br>
      Allowed set of values is <code>true</code> and <code>false</code>. 
    </td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>hstsMaxAge</code></td>
    <td>
      Amount of seconds, the browser should remember to access the webapp via HTTPS.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Corresponds by default to one year</li>
        <li>Is ignored when <code>hstsDisabled</code> is <code>true</code></li>
        <li>Cannot be set in conjunction with <code>hstsValue</code></li>
        <li>Allows a maximum value of 2<sup>31</sup>-1</li>
      </ul>
    </td>
    <td><code>31536000</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>hstsIncludeSubdomainsDisabled</code></td>
    <td>
      HSTS is additionally to the domain of the webapp enabled for all its subdomains.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>hstsDisabled</code> is <code>true</code></li>
        <li>Cannot be set in conjunction with <code>hstsValue</code></li>
      </ul>
    </td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td></td>
    <td><code>hstsValue</code></td>
    <td>
      A custom value for the header can be specified.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>hstsDisabled</code> is <code>true</code></li>
        <li>Cannot be set in conjunction with <code>hstsMaxAge</code> or 
        <code>hstsIncludeSubdomainsDisabled</code></li>
      </ul>
    </td>
    <td><code>max-age=31536000</code></td>
  </tr>
</table>
