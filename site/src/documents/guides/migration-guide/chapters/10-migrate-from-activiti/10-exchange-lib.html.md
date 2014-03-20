---

title: 'Exchange Library'
category: 'Migrate from Activiti'

---


Exchange the existing library (here shown as Maven dependency)

```xml
<dependency>
  <groupId>org.activiti</groupId>
  <artifactId>activiti</artifactId>
  <version>5.11</version>
</dependency>
```

to

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
  <version>7.0.0-Final</version>
</dependency>
```

Make sure that you have the camunda Maven Repository set correctly:

```xml
<repository>
  <id>camunda-bpm-nexus</id>
  <name>camunda Maven Repository</name>
  <url>https://app.camunda.com/nexus/content/groups/public</url>
</repository>
```