---

title: 'Microsoft Sql Server Database Configuration'
weight: 30
menu:
  main:
    identifier: "user-guide-process-engine-database-mssql-configuration"
    parent: "user-guide-process-engine-database"

---

Microsoft SQL Server implements the isolation level `READ_COMMITTED` different
than most databases and does not interact well with the process engine's
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