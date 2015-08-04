---

title: 'JDBC / Datasource Configuration'
weight: 30

menu:
  main:
    identifier: "installation-guide-full-websphere-jdbc-config"
    parent: "installation-guide-full-websphere"

---

The Camunda BPM engine uses one or multiple process engines. Use your application server management tooling for the configuration of the datasources.
The JNDI name of the datasource must be equal to the name used in the datasource-Element of the process engine(s) configured in the bpm-platform.xml file.


## Default JNDI Name

The default JNDI name used by the process engine is <code>jdbc/ProcessEngine</code>

The following screenshot shows the configuration of an XA datasource:

<a href="ref:asset:/guides/installation-guide/was/assets/img/jdbc.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/was/assets/img/jdbc.png" alt=""/>
</a>

Note that you may configure multiple datasources used by different process engine instances. See the <a href="ref:/guides/user-guide/">User Guide</a> for details.