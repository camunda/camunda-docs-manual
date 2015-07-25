---

title: 'Install the Camunda platform modules'
category: 'BPM Platform'

---


The Camunda BPM platform includes one module in the modules folder of the distribution:

```
camunda-ee-oracle-wls-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear
```

The `camunda-oracle-weblogic-ear` is a Java EE application providing the Camunda BPM platform services. It contains an embedded JCA Resource Adapter, the camunda-oracle-weblogic-rar, which provides the jobexecutor service to the camunda BPM platform.
It must be installed to your Oracle Weblogic Application Server.