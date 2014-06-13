---

title: 'Install the camunda BPM platform shared libraries'
shortTitle: 'Install shared libraries'
category: 'BPM Platform'

---


The shared libraries include the camunda engine and some utility JARs. The shared libraries must be visible to both the camunda BPM platform as well es all process applications.

The shared libraries can be found in the lib folder of the distribution:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- joda-time-XX.jar
           |-- ...
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
      |-- camunda-ibm-websphere-rar-$PLATFORM_VERSION.rar

```

The shared libraries must be copied to the $WAS_HOME/lib/ext folder of the IBM WebSphere Server installation.
Restart the WebSphere Server after this operation.
