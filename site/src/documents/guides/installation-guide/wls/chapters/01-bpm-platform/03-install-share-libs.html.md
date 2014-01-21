---

title: 'Install the camunda platform shared libraries'
shortTitle: 'Install shared libraries'
category: 'BPM Platform'

---


The shared libraries include the camunda engine and some utility JARs. The shared libraries must be visible to both the camunda BPM platform as well as all process applications.

The shared libraries can be found in the lib folder of the distribution:

```
camunda-ee-oracle-wls-$PLATFORM_VERSION.zip
|-- modules/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- camunda-identity-ldap-$PLATFORM_VERSION.jar
      |-- camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear
      |-- camunda-oracle-weblogic-rar-$PLATFORM_VERSION.rar

```

The shared libraries must be copied to the $WLS_DOMAIN_HOME/lib folder of the Oracle Weblogic Server installation.
Restart the Weblogic Server after this operation.