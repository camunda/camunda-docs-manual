---

title: 'Maven Coordinates'
category: 'Maven Coordinates'

---


Here are the coordinates to include the camunda BPM enterprise edition in Apache Maven Projects.


## The core process engine

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
  <version>7.0.1-ee</version>
</dependency>
```


## Spring Module

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-spring</artifactId>
  <version>7.0.1-ee</version>
</dependency>
```


## CDI Module

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-cdi</artifactId>
  <version>7.0.1-ee</version>
</dependency>
```


## EJB Client

```xml
<dependency>
  <groupId>org.camunda.bpm.javaee</groupId>
  <artifactId>camunda-ejb-client</artifactId>
  <version>7.0.1-ee</version>
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