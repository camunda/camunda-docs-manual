---

title: 'MySQL Database Configuration'
weight: 50
menu:
  main:
    identifier: "user-guide-process-engine-database-mysql-configuration"
    parent: "user-guide-process-engine-database"

---

This section documents the supported MySQL configuration. 

## Database Schema

The engine's MySQL database schema does not support milliseconds precision for the column types `TIMESTAMP` and `DATETIME`: 
I.e., a to be stored value is rounded to the next or previous second, e.g., `2021-01-01 15:00:46.731` is rounded to `2021-01-01 15:00:47`.

{{< note title="Heads Up!" class="info" >}}
The missing millisecond’s precision for date/time values impacts the process engine's behavior. 
Please read [how to configure the MySQL JDBC Driver]({{< ref "#jdbc-driver-configuration" >}}) 
to ensure that date/time values are handled correctly.
{{< /note >}}

## JDBC Driver Configuration

Here you can find the MySQL JDBC Driver’s configuration prerequisites to ensure a frictionless behavior
of the process engine.

### Disable sending milliseconds for date/time values

{{< note title="Heads Up!" class="info" >}}
This configuration flag is mandatory to avoid unexpected behavior when operating the process engine with MySQL.
{{< /note >}}

When sending a date/time value as part of any SQL statement to the database, the MySQL JDBC Driver >= 5.1.23 sends milliseconds. 
This behavior is problematic since the engine's MySQL database [schema does not support milliseconds precision for date/time values][mysql-schema-milliseconds].

To ensure correct behavior of the process engine when sending date/time values, make sure to update your MySQL JDBC Driver to a version >= 5.1.37.
You can avoid sending milliseconds to the MySQL Server in these versions by setting [`sendFractionalSeconds=false`][mysql-fract-secs] 
in your JDBC connection URL.

Please find below examples of unwanted behavior that occurs, in case the flag `sendFractionalSeconds=false` is not provided:

* When a user performs a task query with `due date == 2021-01-01 15:00:46.731`, the query returns 
  results equal to `2021-01-01 15:00:46.731`. However, since the engine's [database schema does not store
  milliseconds][mysql-schema-milliseconds], no result is returned.
* When a user sets a due date to a task, the value is rounded to the next or previous second, 
  e.g., `2021-01-01 15:00:46.731` is rounded to `2021-01-01 15:00:47`. Please also see the official [MySQL documentation](https://dev.mysql.com/doc/refman/5.6/en/fractional-seconds.html).

[mysql-schema-milliseconds]: #database-schema
[mysql-fract-secs]: https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-connp-props-datetime-types-processing.html#cj-conn-prop_sendFractionalSeconds
