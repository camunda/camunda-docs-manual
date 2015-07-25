---

title: 'Debugging unit tests'
category: 'Testing'

---

When using the in-memory H2 database for unit tests, the following instructions allow to easily inspect the data in the engine database during a debugging session. The screenshots here are taken in Eclipse, but the mechanism should be similar for other IDEs.

Suppose we have put a breakpoint somewhere in our unit test. In Eclipse this is done by double-clicking in the left border next to the code:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/api-test-debug-breakpoint.png" /></center>

If we now run the unit test in debug mode (right-click in test class, select 'Run as' and then 'JUnit test'), the test execution halts at our breakpoint, where we can now inspect the variables of our test as shown in the right upper panel.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/api-test-debug-view.png" /></center>

To inspect the data, open up the 'Display' window (if this window isn't there, open Window->Show View->Other and select Display.) and type (code completion is available) org.h2.tools.Server.createWebServer("-web").start()

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/api-test-debug-start-h2-server.png" /></center>

Select the line you've just typed and right-click on it. Now select 'Display' (or execute the shortcut instead of right-clicking)

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/api-test-debug-start-h2-server-2.png" /></center>

Now open up a browser and go to http://localhost:8082, and fill in the JDBC URL to the in-memory database (by default this is jdbc:h2:mem:camunda), and hit the connect button.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/api-test-debug-h2-login.png" /></center>

You can now see the engine database and use it to understand how and why your unit test is executing your process in a certain way.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/api-test-debug-h2-tables.png" /></center>