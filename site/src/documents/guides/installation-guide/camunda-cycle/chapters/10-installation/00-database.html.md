---

title: 'Create the database schema for Camunda Cycle'
category: 'Installation'

---

Unless you are using the pre-packaged distribution and do not want to exchange the packaged H2 database, you have to first create a database schema for Camunda Cycle.
The Camunda Cycle distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:

```
camunda-cycle-distro-$CYCLE_VERSION.zip/sql/create/*_cycle.sql
```

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool (e.g., SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for Camunda Cycle.

<div class="alert alert-info">
  If you have not got the distro at hand, you can also download a file that packages these
  scripts from our <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/">server</a>.
  Choose the correct version named <code>$CYCLE_VERSION/camunda-cycle-sql-scripts-$CYCLE_VERSION.war</code>.
</div>
