---

title: 'Install the camunda BPM platform modules'
category: 'BPM Platform'

---


The camunda BPM platform includes two modules in the modules folder of the distribution:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
      |-- camunda-ibm-websphere-rar-$PLATFORM_VERSION.rar

```

The camunda-ibm-websphere-rar module is a JCA Resource Adapter providing the jobexecutor service to the camunda BPM platform.
The camunda-ibm-websphere-ear is a Java EE application providing the camunda BPM platform services.

Both modules must be installed to your IBM WebSphere Application Server in the correct order. You must first install the camunda-ibm-websphere-rar module and then install the camunda-ibm-websphere-ear module.