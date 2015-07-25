---

title: 'Install the pre-packaged Distribution'
weight: 10

menu:
  main:
    identifier: "installation-guide-full-tomcat-install-pre-built"
    parent: "installation-guide-full-tomcat"

---


1.  Download the pre-packaged distribution from http://camunda.org/release/camunda-bpm/tomcat/.    
2.  Unpack the distro to a directory.
3.  Adjust the datasource according to your needs (see below).
4.  Startup the server by running `camunda-welcome.bat` or by using the `$TOMCAT_HOME/bin/startup.{bat/sh}` script.


## Accessing the H2 console

You can easily access the H2 console to inspect your local H2 database (used in demo/evaluation scenarios):

1.  Go to http://localhost:8080/h2/h2
2.  Login with the following data:
    *   jdbc:h2:./camunda-h2-dbs/process-engine
    *   User: sa
    *   Password: sa
