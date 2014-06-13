---

title: 'LDAP Configuration'
category: 'Configuration'

---

Initially the camunda standalone webapp is configured to use a built-in database identity service.
If you want to use LDAP instead you have to activate the camunda LDAP identity service. The file
`WEB-INF/applicationContext.xml` already contains a configuration example which is deactivated. In
order to activate it, simply uncomment the lines shown below:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <!-- ... -->
  <property name="processEnginePlugins">
    <list>
      <!-- Uncomment the following next two lines to activate LDAP -->
      <!--<ref bean="ldapIdentityProviderPlugin" />-->
      <!--<ref bean="administratorAuthorizationPlugin" />-->
    </list>
  </property>
</bean>
```

To configure the LDAP service please adjust the values of the bean named `ldapIdentityProviderPlugin` as
described in the [user guide](ref:/guides/user-guide/#process-engine-identity-service-configuration-properties-of-the-ldap-plugin).
Do not forget to configure the authorization plugin as well (see the [documentation](ref:/guides/user-guide/#process-engine-authorization-service)).
