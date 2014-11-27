---

title: 'Configuring email'
category: 'Configuration'

---

**Note**: This step is optional and can be skipped if you do not require Cycle to send a welcome email to newly created users.

<div class="alert alert-info">
  You need to install the java mail library when NOT using the prepackaged distribution.
  Download version 1.4.x manually from <a href=http://mvnrepository.com/artifact/javax.mail/mail>http://mvnrepository.com/artifact/javax.mail/mail</a> and copy it into your <code>$TOMCAT_HOME/lib</code> folder.
</div>

In order to use the Cycle email service, you have to configure a mail session in the `META-INF/context.xml` file in the Cycle web application.

By default, Cycle looks up a mail session using the JNDI Name `mail/Session`.
The name of the mail session to look up can be changed by editing the following file in the Cycle web application:

```
WEB-INF/classes/spring/configuration.xml
```

The file defines a Spring Bean named `cycleConfiguration`. On this spring bean, set the JNDI name of the Mail Session to a custom name:

```xml
<bean id="cycleConfiguration" class="org.camunda.bpm.cycle.configuration.CycleConfiguration">
  <!-- ... -->
  <!-- Cycle email service configuration -->
  <property name="emailFrom" value="cycle@localhost" />
  <property name="mailSessionName" value="my/mail/Session" />
  <!-- ... -->
</bean>
```
