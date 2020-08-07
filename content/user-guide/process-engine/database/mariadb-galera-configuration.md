---

title: 'MariaDB Galera Database Configuration'
weight: 40
menu:
  main:
    identifier: "user-guide-process-engine-database-mariadb-galera-configuration"
    parent: "user-guide-process-engine-database"

---

This section documents the supported Galera Cluster configuration for MariaDB. Both server and client need to be configured correctly. Please note that there are some [known limitations](#galera-cluster-known-limitations) which apply when using Galera cluster, see below.

{{< note title="Warning" class="warning" >}}
Please note that server and client configuration settings defined below are the only configuration that is supported for Galera Cluster. Other configurations are not supported.
{{</ note >}}

### Server Configuration

The following configuration needs to go into the `[galera]` configuration section in the `my.cnf.d/server.cnf` on each server:

```
[galera]
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
transaction-isolation=READ-COMMITTED
wsrep_on=ON
wsrep_causal_reads = 1
wsrep_sync_wait = 7
...
```

Note that other setting may be present in this section but the settings `transaction-isolation`, `wsrep_on`, `wsrep_causal_reads` and `wsrep_sync_wait` need to present and need to have **exactly** the values shown above.

### Client Configuration

Only `failover` and `sequential` configurations are supported. **Other client configuration modes like `replication:`, `loadbalance:`, `aurora:` are not supported.**

The following is the required format of the jdbcUrl property in datasource configurations:

```
jdbc:mariadb:[failover|sequential]://[host1:port],[host2:port],.../[data-base-name]
```

Examples:

```
jdbc:mariadb:failover://192.168.1.1:32980,192.168.1.2:32980,192.168.1.3:32980/process-engine
jdbc:mariadb:sequential://192.168.1.1:32980,192.168.1.2:32980,192.168.1.3:32980/process-engine
```

Important: when running Camunda in a cluster, the client configuration needs to be the same on each node.

### Galera Cluster Known Limitations

The following known limitations apply when using Galera Cluster:

1. APIs requiring Pessimistic read locks in the database do not work correctly. Affected APIs: Exclusive Message correlation (`.correlateExclusively()`). See ({{< javadocref page="?org/camunda/bpm/engine/runtime/MessageCorrelationBuilder.html#correlateExclusively()" text="Javadocs" >}}).
Another possible negative effects:
 * duplication of deployed definitions when deploying the same resources from two threads simultaneously
 * duplication of history cleanup job when calling `HistoryService#cleanUpHistoryAsync` from two threads simultaneously
2. Duplicate checking during deployment does not work if resources are deployed in a cluster concurrently. Concrete impact: suppose there is a Camunda process engine cluster which connects to the same Galera cluster. On deployment of a new process application the process engine nodes will check if the BPMN processes provided by the process application are already deployed, to avoid duplicate deployments. If the deployment is done simultaneously on multiple process engine nodes an exclusive read lock is acquired on the the database (technically, this means that each node performs an SQL `select for update` query.), to do the duplicate checking reliably under concurrency. This does not work on Galera Cluster and may lead to multiple versions of the same process being deployed.
3. The `jdbcStatementTimeout` configuration setting does not work and cannot be used.
