---

title: 'Install the camunda platform modules'
category: 'BPM Platform'

---


The camunda platform includes two modules in the modules folder of the distribution:

```
camunda-ee-oracle-wls-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear
      |-- camunda-oracle-weblogic-rar-$PLATFORM_VERSION.rar

```

The camunda-oracle-weblogic-rar module is a JCA Resource Adapter providing the jobexecutor service to the camunda BPM platform.
The camunda-oracle-weblogic-ear is a Java EE application providing the camunda BPM platform services.

Both modules must be installed to your Oracle Weblogic Application Server in the correct order. You must first install the camunda-oracle-weblogic-rar module and then install the camunda-oracle-weblogic-ear module. The startup order is also important. It is required that the Resource Adapter starts before the EAR module.