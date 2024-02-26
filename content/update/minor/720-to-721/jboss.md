---

title: "Update a Wildfly / JBoss EAP 7 Installation from 7.20 to 7.21"

menu:
  main:
    name: "Wildfly / JBoss EAP 7"
    identifier: "migration-guide-721-jboss"
    parent: "migration-guide-721"

---

The following steps describe how to update the Camunda artifacts on a Wildfly/JBoss EAP 7 in a 
shared process engine scenario. Throughout the procedure, refer to the [update guide][update-guide].

{{< note title="Reading this Guide" class="info" >}}
This guide uses a number of variables to denote common path names and constants:

* `$WILDFLY_HOME` points to the JBoss EAP/WildFly application server main directory.
* `$WILDFLY_DISTRIBUTION` represents the downloaded pre-packaged Camunda 7 distribution for WildFly, e.g. `camunda-bpm-wildfly-$PLATFORM_VERSION.zip` or `camunda-bpm-wildfly-$PLATFORM_VERSION.tar.gz`.
* `$PLATFORM_VERSION` denotes the version of Camunda 7 you want to install or already have installed, e.g. `7.0.0`.
{{< /note >}}

If not already done, download the [Camunda 7.21 WildFly distribution](https://downloads.camunda.
cloud/release/camunda-bpm/wildfly/7.21/)
or [Camunda 7.21 WildFly ≤26 Modules](https://artifacts.camunda.
com/artifactory/camunda-bpm/org/camunda/bpm/wildfly/camunda-wildfly26-modules/). 

The update procedure takes the following steps:

1. Update the Camunda 7 modules.
2. Update optional Camunda 7 modules.
3. Update Camunda web applications.

Whenever the instructions are to *replace* a module, delete the previous version of the module first to avoid orphan jars.

# 1. Update the Camunda 7 modules

Replace the following modules from the folder `$WILDFLY_HOME/modules/` with the new versions from the folder `$WILDFLY_DISTRIBUTION/modules/`:

* `org/camunda/bpm/camunda-engine`
* `org/camunda/bpm/wildfly/camunda-wildfly-subsystem`
* `org/camunda/bpm/model/camunda-bpmn-model`
* `org/camunda/bpm/model/camunda-cmmn-model`
* `org/camunda/bpm/model/camunda-dmn-model`
* `org/camunda/bpm/model/camunda-xml-model`
* `org/camunda/bpm/dmn/camunda-engine-dmn`
* `org/camunda/bpm/dmn/camunda-engine-feel-api`
* `org/camunda/bpm/dmn/camunda-engine-feel-juel`
* `org/camunda/bpm/dmn/camunda-engine-feel-scala`
* `org/camunda/bpm/juel/camunda-juel`
* `org/camunda/template-engines/camunda-template-engines-freemarker`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-typed-values`
* `org/camunda/commons/camunda-commons-utils`
* `org/camunda/connect/camunda-connect-core`
* `org/camunda/connect/camunda-connect-http-client`
* `org/camunda/connect/camunda-connect-soap-http-client`
* `org/camunda/feel/feel-engine`
* `org/apache/httpcomponents/httpclient`
* `org/apache/httpcomponents/httpcore`
* `org/freemarker/freemarker`
* `org/mybatis/mybatis`
* `commons-codec/commons-codec`
* `org/graalvm/js/js`
* `org/graalvm/js/js-scriptengine`
* `org/graalvm/regex/regex`
* `org/graalvm/sdk/graal-sdk`
* `org/graalvm/truffle/truffle-api`
* `com/ibm/icu/icu4j`

# 2. Update optional Camunda 7 modules

In addition to the core modules, there may be optional artifacts in `$WILDFLY_HOME/modules/` for LDAP integration, Camunda Connect, Camunda Spin, and Groovy scripting.
If you use any of these extensions, the following update steps apply:

## LDAP integration

Replace the following module from the folder `$WILDFLY_HOME/modules/` with its new version from the folder `$WILDFLY_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/identity/camunda-identity-ldap`

## Camunda Connect plugin

Replace the following modules from the folder `$WILDFLY_HOME/modules/` with the new versions from the folder `$WILDFLY_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/camunda-engine-plugin-connect`

## Camunda Spin

Replace the following modules from the folder `$WILDFLY_HOME/modules/` with the new versions from the folder `$WILDFLY_DISTRIBUTION/modules/`, if present:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom-jakarta`
    * **Heads-up:** add this module only for WildFly 27+.
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
    * **Heads-up:** add this module only for WildFly ≤26 / JBoss EAP 7.
* `org/camunda/bpm/camunda-engine-plugin-spin`

Additionally, replace the following dependent modules:

* `com/fasterxml/jackson/core/jackson-annotations`
* `com/fasterxml/jackson/core/jackson-core`
* `com/fasterxml/jackson/core/jackson-databind`
* `com/jayway/jsonpath/json-path`
* `net/minidev/accessors-smart`
* `net/minidev/json-smart`

## Groovy

Replace the 'org/codehaus/groovy/groovy-all' module from the folder `$WILDFLY_HOME/modules/` with the following 
modules from the folder `$WILDFLY_DISTRIBUTION/modules/`, if present:

* `org/codehaus/groovy/groovy-all`
* `org/codehaus/groovy/groovy`
* `org/codehaus/groovy/groovy-jsr223`
* `org/codehaus/groovy/groovy-json`
* `org/codehaus/groovy/groovy-xml`
* `org/codehaus/groovy/groovy-templates`

# 3. Update Camunda web applications

## Update REST API

The following steps are required to update the Camunda REST API on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`.
2. Download the REST API web application archive from our Maven Artifactory.
   Alternatively, switch to the private repository for the enterprise version (credentials from license required).
    * For [WildFly 27+](https://artifacts.camunda.com/artifactory/public/org/camunda/bpm/camunda-engine-rest-jakarta/), the name of the artifact is `$PLATFORM_VERSION/camunda-engine-rest-jakarta-$PLATFORM_VERSION-wildfly.war`.
    * For [WildFly ≤26 / JBoss EAP 7](https://artifacts.camunda.com/artifactory/public/org/camunda/bpm/camunda-engine-rest/), the name of the artifact is `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-wildfly.war`.
3. Deploy the web application archive to your JBoss/WildFly instance.

## Update Cockpit, Tasklist, and Admin

The following steps are required to update the Camunda web applications Cockpit, Tasklist, and Admin on a JBoss/WildFly instance:

1. Un-deploy an existing web application with a name like `camunda-webapp`.
2. Download the Camunda web application that contains the web applications from our Maven Artifactory.
   Alternatively, switch to the private repository for the enterprise version (credentials from license required).
    * For [WildFly 27+](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/webapp/camunda-webapp-wildfly/), the name of the artifact is `$PLATFORM_VERSION/camunda-webapp-wildfly-$PLATFORM_VERSION.war`.
    * For [WildFly ≤26 / JBoss EAP 7](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/webapp/camunda-webapp-jboss/), the name of the artifact is `$PLATFORM_VERSION/camunda-webapp-jboss-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your JBoss/WildFly instance.

[update-guide]: {{< ref "/update/minor/720-to-721/_index.md" >}}
