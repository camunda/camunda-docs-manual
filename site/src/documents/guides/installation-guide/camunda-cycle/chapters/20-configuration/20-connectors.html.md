---

title: 'Adding Connectors'
category: 'Configuration'

---

You can add own Connectors in form of JAR files to your camunda Cycle installation. Just follow these steps to add a new Connector.

1. Copy the JAR file which contains the Connector implementation to <code>$TOMCAT_HOME/webapps/cycle/WEB-INF/lib</code>.
2. Edit the <code>$TOMCAT_HOME/webapps/cycle/WEB-INF/classes/spring/connector-configurations.xml</code> file and include a variation of the following snippet:

<div class="app-source" data-source-code="connector-configurations.xml" annotate="code-annotations" ></div>

After adding the JAR file and updating the Connector configuration file, you can start the server. The added Connector appears in the Add Connector dialog and can be used to create roundtrips.


<div class="bootstrap-code">
  <script type="text/xml" id="connector-configurations.xml">
<bean name="svnConnectorDefinition" class="org.camunda.bpm.cycle.entity.ConnectorConfiguration">
  <property name="name" value="Subversion Connector"/>
  <property name="connectorClass" value="org.camunda.bpm.cycle.connector.svn.SvnConnector"/>
  <property name="properties">
    <map>
      <entry key="repositoryPath" value=""></entry>
    </map>
  </property>
</bean>
  </script>
  <script type="text/ng-template" id="code-annotations">
    {
    "connector-configurations.xml":
      { "svnConnectorDefinition": "The name of the bean handling the Connector. Choose one which represents the functionality of the Connector and is not taken yet." ,
      "Subversion Connector": "The name of the Connector as it appears in the Add Connector dialog.",
      "org.camunda.bpm.cycle.connector.svn.SvnConnector": "The qualified name of the class which contains the implementation of the Connector.",
      "entry" : "Properties which are needed by the Connector (e.g. service URL, proxy settings, etc.)"
      }
    }
  </script>
</div>
