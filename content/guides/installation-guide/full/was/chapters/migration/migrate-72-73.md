---

title: 'Migrate from Camunda BPM 7.2 to Camunda BPM 7.3'
weight: 150

menu:
  main:
    identifier: "installation-guide-full-websphere-migrate-73"
    parent: "installation-guide-full-websphere"

---

The following steps describe how to upgrade the Camunda artifacts on an IBM WebSphere application server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.3 IBM WebSphere distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/websphere/camunda-bpm-websphere/).

The upgrade procedure takes the following steps:

1. Uninstall the Camunda libraries and archives
2. Replace Camunda core libraries
3. Replace optional Camunda dependencies
4. Maintain BPM platform configuration (*optional*)
5. Install the Camunda archive
6. Install the Camunda BPM web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

## 1. Uninstall the Camunda Libraries and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`.

## 2. Replace Camunda Core Libraries

With 7.2, you have created a shared library named `Camunda`. We identify the folder to this shared library as `$SHARED_LIBRARY_PATH`.

After shutting down the server, replace the following libraries in `$SHARED_LIBRARY_PATH` with their equivalents from `$WAS_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`

## 3. Replace Optional Camunda Dependencies

In addition to the core libraries, there may be optional artifacts in `$SHARED_LIBRARY_PATH` for LDAP integration, Camunda Connect, and Camunda Spin. If you use any of these extensions, the following upgrade steps apply:

#### LDAP integration

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH` if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

#### Camunda Connect

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH` if present:

* `camunda-connect-core-$CONNECT_VERSION.jar`

#### Camunda Spin

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH` if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

## 4. Maintain the BPM platform configuration

If you have previously replaced the default BPM platform configuration by a custom configuration following any of the ways outlined in the [deployment descriptor reference](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file), it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the upgraded platform.

## 5. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WAS_DISTRIBUTION/modules/camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`. During the installation, the EAR will try to reference the previously created `Camunda` shared library.

## 6. Install the Camunda Web Applications

#### Camunda REST API

The following steps are required to upgrade the Camunda REST API on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

#### Camunda Cockpit, Tasklist, and Admin

The following steps are required to upgrade the Camunda web applications Cockpit, Tasklist, and Admin on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-webapp-ee-was-$PLATFORM_VERSION.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

<div class="alert alert-info">
  <p><strong>LDAP Entity Caching</strong></p>
  <p>Beginning with 7.2, it is possible to enable entity caching for Hypertext Application Language (HAL) requests that the Camunda web applications make. If you have previously used caching, you can enable this feature by modifying the Camunda webapp artifact. See the <a href="ref:/api-references/rest/#overview-hypertext-application-language-hal-caching-of-hal-relations">REST Api Documentation</a> for details.</p>
</div>

[migration-guide]: ref:/guides/migration-guide/#migrate-from-camunda-bpm-72-to-73
