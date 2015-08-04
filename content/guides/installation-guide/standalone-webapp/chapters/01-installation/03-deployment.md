---

title: 'Deploy'
weight: 20

menu:
  main:
    identifier: "installation-guide-standalone-deploy"
    parent: "installation-guide-standalone"

---

Once you downloaded the `camunda-webapp-SERVER-standalone-VERSION.war` file you
must deploy it to your application server.<br>
**Note:** Make sure to use a vanilla distribution of your application server, not an application server downloaded
from camunda.<br>
The exact deployment procedure for web applications depends on
your application server. In case you aren't sure how to install the application, please refer to your application server documentation.


The default context path for the camunda web application is `/camunda`.<br>
**Note:** If you install the camunda standalone web application on Apache Tomcat by dropping
it in the `webapps` folder, Tomcat will assign the filename of the war file as
the context path. If you want the context path to be `/camunda`, rename the war
file to `camunda.war`.

Given that your application is binding to localhost, is running on port 8080
and the context path is `/camunda`, you can then access the camunda standalone
web application by using the following url:

[http://localhost:8080/camunda/](http://localhost:8080/camunda/)
