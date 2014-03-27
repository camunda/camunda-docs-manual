---

title: 'Deploy'
category: 'Installation'

---

Once you downloaded the `camunda-webapp-SERVER-standalone-VERSION.war` file you
must deploy it to your application server. Note: Make sure to use a vanilla
distribution of your application server, not an application server downloaded
from camunda. The exact deployment procedure for web applications depends on
your application server.  Please refer to your application server documentation
if you are unsure how to install the application.

The default context path for the camunda web application is `/camunda`. Note:
If you install camunda standalone web application on Apache Tomcat by dropping
it in the `webapps` folder tomcat will assign the filename of the war file as
the context path. If you want the context path to be `/camunda` rename the war
file to `camunda.war`.

Given that your application is binding to localhost and is running on port 8080
and the context path is `/camunda`. Than you can access the camunda standalone
web application using the following url:

[http://localhost:8080/camunda/](http://localhost:8080/camunda/)
