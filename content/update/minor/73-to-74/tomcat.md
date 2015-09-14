---

title: "Update a Tomcat Installation from 7.3 to 7.4"

menu:
  main:
    name: "Tomcat"
    identifier: "migration-guide-73-tomcat"
    parent: "migration-guide-73"

---

The following steps describe how to upgrade the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire procedure, refer to the [upgrade guide][upgrade-guide]. If not already done, make sure to download the [Camunda BPM 7.4 Tomcat distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The upgrade procedure takes the following steps:

...

<!-- TODO: define steps and describe in detail below -->

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

{{< note title="Upgraded Tomcat Version" class="info" >}}
The pre-built Camunda 7.4 distribution ships with Tomcat 8.0.26, whereas 7.3 comes with Tomcat 7.0.62. Camunda 7.4 is supported on all Tomcat 6/7/8 versions such that a Tomcat upgrade is not required when migrating from 7.3 to 7.4.

Should you want to upgrade Tomcat along with Camunda, perform the following steps either before or after upgrading Camunda:

* Copy all your Camunda-related libraries from `$TOMCAT_HOME/lib` to the new Tomcat server's `lib`-directory.
* Apply all modifications to Tomcat configuration files such as `server.xml`/`bpm-platform.xml` to the files located in the new Tomcat server's directory.
* Undeploy all process applications and copy them to the new Tomcat server's directory for redeployment.

See the [Tomcat migration guide](https://tomcat.apache.org/migration-8.html#Migrating_from_7.0.x_to_8.0.x) for any Tomcat-specific migration notes and procedures.
{{< /note >}}

[upgrade-guide]: {{< relref "update/minor/73-to-74/index.md" >}}
