---

title: 'Install the Camunda platform shared libraries'
shortTitle: 'Install shared libraries'
category: 'BPM Platform'

---


The shared libraries include the Camunda engine and some utility JARs. The shared libraries must be visible to both the Camunda BPM platform as well as all process applications.

The shared libraries can be found in the lib folder of the distribution:

```
camunda-ee-oracle-wls-$PLATFORM_VERSION.zip
|-- modules/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- ...
      |-- camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear
```

The shared libraries must be copied to the `$WLS_DOMAIN_HOME/lib` folder of your Oracle WebLogic Server installation. Do **"NOT"** copy it to your `$WL_HOME/lib` folder.
Restart the Weblogic Server after this operation.

<div class="alert alert-info">
  <strong>Hint:</strong>
  <p>
    You can optionally create a shared library out of the Camunda BPM platform shared libraries.
    Then associate it with the `camunda-oracle-weblogic-ear` during installation.
    You must then also associate the shared library with each deployed process application.
    Have a look at the <a href="https://docs.oracle.com/cd/E24329_01/web.1211/e24368/libraries.htm#WLPRG325">Oracle WebLogic documentation</a> on how to create the shared library.
  </p>
</div>