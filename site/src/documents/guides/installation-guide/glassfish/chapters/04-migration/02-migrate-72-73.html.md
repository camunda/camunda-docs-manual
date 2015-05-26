---

title: 'Migrate from Camunda BPM 7.2 to Camunda BPM 7.3'
shortTitle: 'Migrate from 7.2 to 7.3'
category: 'Migration'

---

The following steps describe how to upgrade the Camunda artifacts on a Glassfish 3.1 application server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.3 Glassfish distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/glassfish/camunda-bpm-glassfish/).

The upgrade procedure takes the following steps:

1. Uninstall the Camunda libraries and archives
2. Replace Camunda core libraries
3. Replace optional Camunda dependencies
4. Maintain BPM platform configuration (*optional*)
5. Install the Camunda archive
6. Install the Camunda BPM web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

## 1. Uninstall the Camunda Applications and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-glassfish-ear-$PLATFORM_VERSION.ear`. Then, uninstall the Camunda job executor adapter, called `camunda-jobexecutor-rar-$PLATFORM_VERSION.rar`.

## 2. Replace Camunda Core Libraries

After shutting down the server, replace the following libraries in `$GLASSFISH_HOME/glassfish/lib` with their equivalents from `$GLASSFISH_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`

## 3. Replace Optional Camunda Dependencies

In addition to the core libraries, there may be optional artifacts in `$GLASSFISH_HOME/glassfish/lib` for LDAP integration, Camunda Connect, and Camunda Spin. If you use any of these extensions, the following upgrade steps apply:

#### LDAP integration

Copy the following libraries from `$GLASSFISH_DISTRIBUTION/modules/lib` to the folder `$GLASSFISH_HOME/glassfish/lib` if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

#### Camunda Connect

Copy the following libraries from `$GLASSFISH_DISTRIBUTION/modules/lib` to the folder `$GLASSFISH_HOME/glassfish/lib` if present:

* `camunda-connect-core-$CONNECT_VERSION.jar`

#### Camunda Spin

Copy the following libraries from `$GLASSFISH_DISTRIBUTION/modules/lib` to the folder `$GLASSFISH_HOME/glassfish/lib` if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

## 4. Maintain the BPM platform configuration

If you have previously replaced the default BPM platform configuration by a custom configuration following any of the ways outlined in the [deployment descriptor reference](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file), it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the upgraded platform.

## 5. Install the Camunda Archive

First, install the camunda job executor resource adapter, namely the file `$GLASSFISH_DISTRIBUTION/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar`. Then, install the camunda EAR, i.e. the file `$GLASSFISH_DISTRIBUTION/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear`.

## 6. Install the Camunda Web Applications

#### Camunda REST API

The following steps are required to upgrade the camunda REST API on a Glassfish instance:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Deploy the web application archive to your Glassfish instance.

#### Camunda Cockpit, Tasklist, and Admin

The following steps are required to upgrade the camunda web applications Cockpit, Tasklist, and Admin on a Glassfish instance:

1. Download the camunda web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-glassfish/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-glassfish-$PLATFORM_VERSION.war`.
2. Deploy the web application archive to your Glassfish instance.

<div class="alert alert-info">
  <p><strong>LDAP Entity Caching</strong></p>
  <p>Beginning with 7.2, it is possible to enable entity caching for Hypertext Application Language (HAL) requests that the Camunda web applications make. If you have previously used caching, you can enable this feature by modifying the Camunda webapp artifact. See the <a href="ref:/api-references/rest/#overview-hypertext-application-language-hal-caching-of-hal-relations">REST Api Documentation</a> for details.</p>
</div>

[configuration-location]: ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file
[migration-guide]: ref:/guides/migration-guide/#migrate-from-camunda-bpm-72-to-73
