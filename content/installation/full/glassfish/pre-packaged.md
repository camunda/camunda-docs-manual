---

title: 'Install the pre-packaged Distribution'
weight: 10

menu:
  main:
    name: "Pre-Packaged Distribution"
    identifier: "installation-guide-full-glassfish-install-pre-built"
    parent: "installation-guide-full-glassfish"
    pre: "Download and install Glassfish Application Server with the Full Distribution pre-deployed and pre-configured."

---

For Glassfish, a pre-packaged distribution is provided. In the pre-packaged distribution provides Glassfish Application Server itself with all the Camunda librarires and webapplications pre-installed and pre-configured.

1.   Download the pre-packaged distribution from http://camunda.org/release/camunda-bpm/glassfish/.
2.   Unpack the distro to a directory.
3.   Adjust the datasource according to your needs (see [Manual Installation]({{<relref "installation/full/glassfish/manual.md" >}})).
4.   Startup the server by running `camunda-welcome.bat` or using the `$GLASSFISH_HOME/glassfish/config/startserv.{bat/sh}` script.
