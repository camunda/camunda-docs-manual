---

title: 'Migrate from Camunda BPM 7.2 to Camunda BPM 7.3'
weight: 80

menu:
  main:
    identifier: "installation-guide-full-tomcat-migrate-73"
    parent: "installation-guide-full-tomcat"

---

The following steps describe how to upgrade the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.3 Tomcat distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The upgrade procedure takes the following steps:

1. Upgrade the Camunda BPM core libraries
2. Upgrade the optional Camunda BPM libraries
3. Upgrade Camunda web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

<div class="alert alert-info">
  <p><strong>Upgraded Tomcat Version</strong></p>
  <p>The pre-built Camunda 7.3 distribution ships with Tomcat 7.0.62, whereas 7.2 comes with Tomcat 7.0.50. Camunda 7.3 is supported on all Tomcat 6/7 versions such that a Tomcat upgrade is not required when migrating from 7.2 to 7.3.</p>
  <p>
    Should you want to upgrade Tomcat along with Camunda, perform the following steps either before or after upgrading Camunda:
  </p>
  <p>
    <ul>
      <li>Copy all your Camunda-related libraries from <code>$TOMCAT_HOME/lib</code> to the new Tomcat server's <code>lib</code>-directory.</li>
      <li>Apply all modifications to Tomcat configuration files such as <code>server.xml</code>/<code>bpm-platform.xml</code> to the files located in the new Tomcat server's directory.</li>
      <li>Undeploy all process applications and copy them to the new Tomcat server's directory for redeployment.</li>
    </ul>
  </p>
  <p>
    See the <a href="https://tomcat.apache.org/migration-7.html#Upgrading_7.0.x">Tomcat migration guide</a> for any Tomcat-specific migration notes and procedures.
  </p>
</div>

## 1. Upgrade the Camunda BPM Core Libraries

Replace the following libraries in the folder `$TOMCAT_HOME/lib/` with their new versions from the folder `$TOMCAT_DISTRIBUTION/lib/`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`

## 2. Upgrade Optional Camunda BPM libraries

In addition to the core libraries, there may be optional artifacts in `$TOMCAT_HOME/lib/` for LDAP integration, Camunda Connect, and Camunda Spin. If you use any of these extensions, the following upgrade steps apply:

#### LDAP integration

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/` if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

#### Camunda Connect

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/` if present:

* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-engine-plugin-connect-$PLATFORM_VERSION.jar`

#### Camunda Spin

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/` if present:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$PLATFORM_VERSION.jar`

## 3. Upgrade Camunda Web Applications

#### Upgrade Camunda REST API

The following steps are required to upgrade the camunda REST API on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
3. Deploy the web application archive to your Tomcat instance.

#### Upgrade Camunda Cockpit, Tasklist, and Admin

The following steps are required to upgrade the camunda web applications Cockpit, Tasklist, and Admin on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-tomcat/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your Tomcat instance.

<div class="alert alert-info">
  <p><strong>LDAP Entity Caching</strong></p>
  <p>Beginning with 7.2, it is possible to enable entity caching for Hypertext Application Language (HAL) requests that the Camunda web applications make. If you have previously used caching, you can enable this feature by modifying the Camunda webapp artifact. See the <a href="ref:/api-references/rest/#overview-hypertext-application-language-hal-caching-of-hal-relations">REST Api Documentation</a> for details.</p>
</div>

[migration-guide]: ref:/guides/migration-guide/#migrate-from-camunda-bpm-72-to-73
