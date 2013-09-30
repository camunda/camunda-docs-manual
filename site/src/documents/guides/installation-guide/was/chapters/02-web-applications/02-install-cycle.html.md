---

title: 'Install camunda Cycle'
category: 'Web Applications'

---


**Note**: We do not recommend to install camunda Cycle together with the other platform components (webapps, engine, REST Api) on the same runtime environment. Such a combined installation is not supported.


## Create the database schema for camunda Cycle

The next step consists in creating a database schema for camunda Cycle. The camunda platform distribution ships with a set of SQL create scripts that can be executed by a database administrator.
The SQL create scripts reside in the camunda platform distribution in the sql/create folder, like <code>sql/create/*_cycle_VERSION.sql</code>.

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for camunda Cycle.


## Create a datasource

Now you must define a datasource in IBM Websphere Application Server. We assume here that you are familiar with the procedure. If in doubt, check the appropriate sections in the manual of your application server.

<div class="alert alert-info">
  <p><strong>Note</strong></p>
  <p>In the default configuration, Cycle will lookup a datasource named <code>jdbc/CycleDS</code>.</p>
</div>

The datasource should be named <code>jdbc/CycleDS</code>.
In order to use a custom datasource name, you have to edit the file named Cycle-persistence.xml residing at

```
Cycle-was-VERSION.war/WEB-INF/classes/META-INF/cycle-persistence.xml
```


## Installation

The camunda Cycle WAR file resides under <code>webapps/cycle-was-$PLATFORM_VERSION.war</code> in the WAS distribution archive.

In the following we explain how to install the WAR file using the Websphere enterprise application Wizard provided inside the Websphere Integrated Solutions Console:

1.  Open the Websphere Integrated Solutions Console.
2.  Navigate to the **Applications / Application Types / WebSphere enterprise applications** Page.
3.  Click the **Install** Button
4.  The first page of the Wizard opens. Using the File Browser, select the <code>cycle-was-VERSION.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select the **"Fast Path"** on the next page.
7.  Step 1. Usually, no changes are required.
8.  Step 2. Usually, no changes are required.
9.  Step 3. Usually, no changes are required.
10. Step 4. Define a context root for Cycle. We propose to use **/cycle**
11. Step 5. Usually, no changes are required.

After completing the wizard, Cycle should be successfully installed on the application server. Don't forget to save your changes to the master configuration.
In some situations, you also have to start the web application manually from the **Applications / Application Types / WebSphere enterprise applications** Page.

<div class="alert alert-warning">
  <p><strong>Note</strong></p>
  <p>In some configurations, Cycle might prevent other web applications to work properly due to classloading issues and the bundled JAX-RS implementation in Cycle.</p>
  <p>To fix this, go to <strong>Applications / Application Types / WebSphere enterprise applications</strong>. Click on the Cycle application link and go the the <strong>Startup Behaviour</strong> view.</p>
  <p>You should increase the startup order to a value higher than the one of the application(s) Cycle is conflicting with. The default value is <code>1</code>, so you should be fine with <code>2</code> for Cycle</p>
  <p>You need to reboot the server after doing this.</p>
</div>


## Using SaaS Signavio / camunda webmodeler over HTTPS

<div class="alert alert-warning">
  <p><strong>Note</strong></p>
  <p>When you want to use the SaaS offer by Signavio or internally using the camunda webmodeler over the HTTPS protocol and Cycle is deployed on WAS, then you have to install the `IBM Unrestricted JCE policy` files provided by IBM.</p>
  <p>You can download them <a href="https://www14.software.ibm.com/webapp/iwm/web/reg/pick.do?source=jcesdk">here</a> with an valid IBM ID account. Just choose the version which fits your JDK Version + Service Release your WAS is running on.</p>
  <p>After you have downloaded them, drop the extracted jar files into your `$WAS_HOME/AppServer/java/jre/lib/security` folder and restart the server afterwards.</p>
</div>