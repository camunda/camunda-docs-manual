---

title: 'Microsoft SQL Server and Azure SQL Database Configuration'
weight: 30
menu:
  main:
    identifier: "user-guide-process-engine-database-mssql-configuration"
    parent: "user-guide-process-engine-database"

---

This section documents the additional database configuration changes necessary to correctly use 
Microsoft SQL Server or Microsoft Azure SQL databases with Camunda 7. It provides guides
on:

* How to set the correct database transaction isolation level.
* How different Microsoft SQL Server versions are supported in Azure SQL.
* How Camunda supports Azure SQL.
* How to configure a database on Azure SQL to be supported by Camunda.

To use these guides, you should have a basic understanding of (Microsoft's) T-SQL syntax. You should 
also have access to a database administration tool that can interact with your Microsoft database.

# Transaction Isolation Levels

This section applies to the following database types:

* Microsoft SQL Server
* Microsoft Azure SQL

Microsoft SQL Server and Azure SQL implement the `READ_COMMITTED` isolation level different
than most databases and do not interact well with the process engine's
[optimistic locking]({{< ref "/user-guide/process-engine/transactions-in-processes.md#optimistic-locking" >}}) scheme. 
As a result you may suffer deadlocks when putting the process engine under high load.

If you experience deadlocks in your MSSQL installation, you must execute the
following statements in order to enable SNAPSHOT isolation:

```sql
ALTER DATABASE [process-engine]
SET ALLOW_SNAPSHOT_ISOLATION ON

ALTER DATABASE [process-engine]
SET READ_COMMITTED_SNAPSHOT ON
```
where `[process-engine]` contains the name of your database.

# Camunda support for Azure SQL

This section applies only to the following Microsoft database products:

* *Azure SQL Managed Instance* 
* *Azure SQL Database*

The SQL Server database engine has a *Database Compatibility Level* setting that provides backward 
compatibility with earlier versions of SQL Server. This backward compatibility covers Transact-SQL 
and query optimization behaviors, and can be applied per database.

Microsoft's *Azure SQL Managed Instance* and *Azure SQL Database* products always use the latest 
stable version of the SQL Server database engine. In order to provide backward compatibility with
earlier SQL Server versions, the Azure SQL products utilize the *Database Compatibility Level* setting.

## Azure SQL compatibility levels supported by Camunda

Microsoft associates each SQL Server version with a *Database Compatibility Level*. You can find a table
of the SQL Server versions, and their associated compatibility level values 
[at the Microsoft *Alter Compatibility Level* page](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-compatibility-level?view=sql-server-ver15#arguments).

Camunda supports the *Database Compatibility Level* values of the currently supported Microsoft 
SQL Server versions documented in our [Supported Database Products section]({{< ref "/introduction/supported-environments.md#supported-database-products" >}}).

## Configuring a database on Azure SQL

It is advised to explicitly set the *Database Compatibility Level* setting for each database created on
Azure SQL. The default value of the *Database Compatibility Level* setting is updated every time a new 
SQL Server version is released. If a *Database Compatibility Level* value isn't explicitly set on a 
database, the default value will be used. Using the default value may lead to unexpected behavior, or
behavior unsupported by Camunda.

To set the *Database Compatibility Level* to a specific value, execute the following code:

```sql
ALTER DATABASE [database_name]
SET COMPATIBILITY_LEVEL = [compatibility_level]
```

In the code above, `[database_name]` should be replaced with the name of your database, and
`[compatibility_level]` should be replaced with the *Database Compatibility Level* value of the
SQL Server version you would like to use. You can see a list of all the available values 
[at the Microsoft *Alter Compatibility Level* page](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-compatibility-level?view=sql-server-ver15#arguments).
