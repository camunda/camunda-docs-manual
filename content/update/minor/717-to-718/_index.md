---

title: "Update from 7.17 to 7.18"
weight: 6
layout: "single"

menu:
  main:
    name: "7.17 to 7.18"
    identifier: "migration-guide-718"
    parent: "migration-guide-minor"
    pre: "Update from `7.17.x` to `7.18.0`."

---

This document guides you through the update from Camunda Platform `7.17.x` to `7.18.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
2. For administrators and developers: [Full distribution update](#full-distribution)
3. For administrators: [Standalone web application](#standalone-web-application)
4. For administrators and developers: [Groovy version update](#groovy-version-update)
5. For administrators: [Camunda Docker Images: Base image updated to Alpine 3.15](#camunda-docker-images-base-image-updated-to-alpine-3-15)
6. For administrators and developers: [XLTS for AngularJS](#xlts-for-angularjs)
1. For administrators and developers: [Stricter default Content Security Policy](#stricter-default-content-security-policy)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda Platform 7.18.

# Database updates

Every Camunda installation requires a database schema update. Check our [database schema update guide]({{< ref "/installation/database-schema.md#update" >}}) 
for further instructions.

# Full distribution

This section is applicable if you installed the 
[Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) 
with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server.
2. Migrate custom process applications.

Before starting, ensure you have downloaded the Camunda Platform 7.18 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [JBoss EAP 6 or Wildfly / JBoss EAP 7]({{< ref "/update/minor/717-to-718/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/717-to-718/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/717-to-718/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/717-to-718/was.md" >}})

## Custom process applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`

There are no new mandatory dependencies for process applications.

# Standalone web application

If you use a standalone web application, replace the current `.war` artifact with its new version.

Take the following steps to complete the update:

1. Undeploy the current version of the standalone web application.
2. Update the database to the new schema as described in the [database update](#database-updates) section.
3. Configure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}}) section.
4. Deploy the new and configured standalone web application to the server.

# Groovy version update

Camunda Platform 7 provides the Groovy script engine by default with the pre-packaged distributions. With Camunda Platform
7.18, we bumped Groovy to version `2.4.21`. With this Groovy version bump, we decided to move away from the `groovy-all-$GROOVY_VERSION.jar` 
since newer Groovy versions [don't provide a `groovy-all-$GROOVY_VERSION.jar` anymore](https://groovy-lang.org/releasenotes/groovy-2.5.html).
Therefore, you will find the following Groovy-related libraries in the Camunda Platform 7.18 pre-packed distributions:

* `groovy-$GROOVY_VERSION.jar`
* `groovy-jsr223-$GROOVY_VERSION.jar`
* `groovy-json-$GROOVY_VERSION.jar`
* `groovy-xml-$GROOVY_VERSION.jar`
* `groovy-templates-$GROOVY_VERSION.jar`

The `groovy` and `groovy-jsr-223` Groovy modules are required for correct operation of the Groovy script engine.
Since the `groovy-all.jar` included a lot more than `groovy` and `groovy-jsr-223` modules, we decided to provide additional useful Groovy modules.

Camunda users relying on Groovy for their scripts need to replace the libraries as described in the
[Camunda libraries and applications](#camunda-libraries-and-applications) guide for their application server. Camunda Platform Run users need to replace the `groovy-all-$GROOVY_VERSION.jar` in the `{RUN_HOME}/configuration/userlib/` directory with the `.jar` libraries from the list above.

Camunda users who don't rely on Groovy can ignore this section.

# Camunda Docker Images: Base image updated to Alpine 3.15

With Camunda Platform 7.18, Alpine, the base image in Camunda’s Docker images, has been updated from version 3.13 to 3.15.

We went through the release notes to identify breaking changes and could identify the following:

> The faccessat2 syscall has been enabled in musl. This can result in issues on docker hosts with older versions of docker (<20.10.0) and libseccomp (<2.4.4), which blocks this syscall.

Besides Docker runtime versions < 20.10.0, alternative docker runtimes like containerd.io are also affected by this.
Read more about it in the [Alpine 3.14 Release Notes](https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.14.0#faccessat2).

If you have extended the Camunda docker images yourself, please read the release notes of Alpine 3.14 and 3.15 carefully:

* https://alpinelinux.org/posts/Alpine-3.14.0-released.html
* https://alpinelinux.org/posts/Alpine-3.15.0-released.html

# XLTS for AngularJS

Camunda Platform 7.18.0 replaces the AngularJS libraries with XLTS for AngularJS. Where AngularJS was licensed entirely under the MIT license, XLTS for AngularJS licenses additional parts under the XLTS for AngularJS – EULA. By downloading and using Camunda with XLTS for AngularJS, you agree to the terms of the XLTS for AngularJS – EULA. Please see our [third-Party libraries documentation]({{< ref "/introduction/third-party-libraries/_index.md#xlts-for-angularjs" >}}) for details and the terms of the EULA.

# Stricter default Content Security Policy

The default **Content Security Policy** configuration is changing from version 7.18.
In older versions, the default policy used to be a very minimal configuration, which had to be explicitly strengthened according to our recommendations.\
With this version, we make the previously recommended **Content Security Policy** the default policy and make it even stricter by introducing the `strict-dynamic` directive.
If you have added custom script tags in one of the `index.html` files of the Webapps, add the `nonce` attribute to the opening script tag:
```html
<script type="application/javascript" nonce="$CSP_NONCE">
```
You don't need to worry about whitelisting for scripts you load via our plugin system.

You can find the details in the [Content Security Policy]({{< ref "/webapps/shared-options/header-security.md#content-security-policy" >}}) section.