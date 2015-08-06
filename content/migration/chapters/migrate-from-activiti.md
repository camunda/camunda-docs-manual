---

title: "Migration from Activiti"
weight: 60

menu:
  main:
    identifier: "migration-guide-activiti"
    parent: "migration-guide"

---

We based our fork on the database schema of Activiti 5.11. So please [upgrade](http://www.activiti.org/userguide/index.html#databaseUpgrade) your project to this database using the upgrade scripts provided by Activiti. If you are using a newer version, best ask for assistance in the [Forum](http://camunda.org/community/forum.html).


# Exchange Library

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

Make sure that you have the Camunda Maven Repository set correctly:

```xml
<repository>
  <id>camunda-bpm-nexus</id>
  <name>camunda Maven Repository</name>
  <url>https://app.camunda.com/nexus/content/groups/public</url>
</repository>
```


# Adjust package names

Just do an **Organize Imports** in your IDE, that should do the trick as the API class names have not changed.
Your IDE should figure out the rest for you.
For Eclipse this can be done by clicking on the project and hitting `Ctrl-Shift-O`.

## Which Activiti class names have changed?

<table class="table table-striped">
  <thead>
    <tr>
      <th>component</th>
      <th>Activiti class name</th>
      <th>Camunda class name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>engine</td>
      <td>ActivitiException</td>
      <td>ProcessEngineException</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitiClassLoadingException</td>
      <td>ClassLoadingException</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitiOptimisticLockingException</td>
      <td>OptimisticLockingException</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitiTaskAlreadyClaimedException</td>
      <td>TaskAlreadyClaimedException</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitiWrongDbException</td>
      <td>WrongDbException</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitRule</td>
      <td>ProcessEngineRule</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitiTestCase</td>
      <td>ProcessEngineTestCase</td>
    </tr>
    <tr>
      <td></td>
      <td>PluggableActivitiTestCase</td>
      <td>PluggableProcessEngineTestCase</td>
    </tr>
    <tr>
      <td></td>
      <td>AbstractActivitiTestCase</td>
      <td>AbstractProcessEngineTestCase</td>
    </tr>
    <tr>
      <td></td>
      <td>ResourceActivitiTestCase</td>
      <td>ResourceProcessEngineTestCase</td>
    </tr>
    <tr>
      <td>spring</td>
      <td>ActivitiComponent</td>
      <td>ProcessEngineComponent</td>
    </tr>
    <tr>
      <td></td>
      <td>SpringActivitiTestCase</td>
      <td>SpringProcessEngineTestCase</td>
    </tr>
    <tr>
      <td>cdi</td>
      <td>ActivitiCdiException</td>
      <td>ProcessEngineCdiException</td>
    </tr>
    <tr>
      <td></td>
      <td>ActivitiExtension</td>
      <td>ProcessEngineExtension</td>
    </tr>
    <tr>
      <td></td>
      <td>CdiActivitiTestCase</td>
      <td>CdiProcessEngineTestCase</td>
    </tr>
  </tbody>
</table>

That's it - now your application should run again.