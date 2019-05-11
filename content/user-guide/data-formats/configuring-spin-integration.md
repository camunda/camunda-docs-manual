---

title: 'Configuring Spin Integration'
weight: 10

menu:
  main:
    identifier: "user-guide-spin-config"
    parent: "user-guide-spin"

---

To use Spin with a process engine, the relevant Spin libraries have to be on the engine's classpath. Furthermore, the process engine plugin provided by Spin has to be registered with the engine. When using a pre-built Camunda distribution, Spin is already integrated.

There are two types of Spin artifacts:

* `camunda-spin-core`: a jar that contains only the core Spin classes. In addition to `camunda-spin-core`, single data format artifacts like `camunda-spin-dataformat-json-jackson` and `camunda-spin-dataformat-xml-dom` exist that provide the JSON and XML functionality. These dependencies should be used when the default data formats have to be reconfigured or when custom data formats are used.
* `camunda-spin-dataformat-all`: a single jar without dependencies that contains the XML and JSON data formats.
* `camunda-engine-plugin-spin`: a process engine plugin which adds Spin to the Camunda BPM platform.


# Maven coordinates

{{< note title="" class="info" >}}
  Please import the [Camunda BOM](/get-started/apache-maven/) to ensure correct versions for every Camunda project.
{{< /note >}}


## camunda-spin-core

`camunda-spin-core` contains Spin's core classes that every data format implementation requires. Additionally, XML and JSON data formats can be included with the dependencies `camunda-spin-dataformat-json-jackson` and `camunda-spin-dataformat-xml-dom`. These artifacts will transitively pull in their dependencies, like Jackson in the case of the JSON data format. For integration with the engine, the artifact `camunda-engine-plugin-spin` is needed. Given that the BOM is imported, the Maven coordinates are as follows:

```xml
<dependency>
  <groupId>org.camunda.spin</groupId>
  <artifactId>camunda-spin-core</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.camunda.spin</groupId>
  <artifactId>camunda-spin-dataformat-json-jackson</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.camunda.spin</groupId>
  <artifactId>camunda-spin-dataformat-xml-dom</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-plugin-spin</artifactId>
</dependency>
```

## camunda-spin-dataformat-all

This artifact contains the XML and JSON dataformats as well as their dependencies. To avoid conflicts with other versions of these dependencies, Spin's dependencies are relocated to different packages. `camunda-spin-dataformat-all` has the following Maven coordinates:

```xml
<dependency>
  <groupId>org.camunda.spin</groupId>
  <artifactId>camunda-spin-dataformat-all</artifactId>
</dependency>
```


# Configuring the Spin Process Engine Plugin

`camunda-engine-plugin-spin` contains a class called `org.camunda.spin.plugin.impl.SpinProcessEnginePlugin` that can be registered with a process engine using the [plugin mechanism]({{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}). For example, a `bpm-platform.xml` file with the plugin enabled would look as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">

  ...

  <process-engine name="default">
    ...

    <plugins>
      <plugin>
        <class>org.camunda.spin.plugin.impl.SpinProcessEnginePlugin</class>
      </plugin>
    </plugins>

    ...
  </process-engine>

</bpm-platform>
```

{{< note title="Note:" class="info" >}}
  When using a pre-built distribution of Camunda BPM, the plugin is already pre-configured.
{{< /note >}}