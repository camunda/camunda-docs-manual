---

title: 'Maven Coordinates'
category: 'Maven Coordinates'

---


Here are the coordinates to include the camunda BPM enterprise edition in Apache Maven Projects.

## The camunda BOM

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-bom</artifactId>
  <version>7.1.0-Final-ee</version>
  <scope>import</scope>
  <type>pom</type>
</dependency>
```

<div class="alert alert-info">
  We recommend to import the camunda BOM to ensure correct versions for every camunda project.
</div>



## The core process engine

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
</dependency>
```


## Spring Module

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-spring</artifactId>
</dependency>
```


## CDI Module

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-cdi</artifactId>
</dependency>
```


## EJB Client

```xml
<dependency>
  <groupId>org.camunda.bpm.javaee</groupId>
  <artifactId>camunda-ejb-client</artifactId>
</dependency>
```


## Repository

Do not forget to add the [camunda enterprise repository](https://app.camunda.com/nexus/content/repositories/camunda-bpm-ee) to your pom (or local nexus).

```xml
<repositories>
  <repository>
    <id>camunda-bpm-nexus</id>
    <name>camunda-bpm-nexus</name>
    <url>https://app.camunda.com/nexus/content/repositories/camunda-bpm-ee</url>
  </repository>
</repositories>
```
