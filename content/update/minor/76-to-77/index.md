---

title: "Update from 7.6 to 7.7"
weight: 60

menu:
  main:
    name: "7.6 to 7.7"
    identifier: "migration-guide-76"
    parent: "migration-guide-minor"
    pre: "Update from `7.6.x` to `7.7.0`."

---

This document guides you through the update from Camunda BPM 7.6.x to 7.7.0. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Shared Database](#shared-database)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.7.

Noteworthy new Features and Changes in 7.7:

* New cryptographic hash function with salt

# Database Updates

Every Camunda installation requires a database schema update.

# Shared Database

In case you use Camunda in a [clustered environment](../../../introduction/architecture/#clustering-model) with a shared database. Assuming you have a situation where:

* two engines are deployed,
* the first engine `A` has a Camunda verison >= 7.7,
* the second engine `B` has a Camunda version <= 7.6 version,
* both engines access the same database to authenticate the respective users. 

A user created with the engine `A` cannot be authenticated with the engine `B`. The reason is that the Camunda version 7.7 adds [salt to password hashing](../../../user-guide/process-engine/password-hashing/), thus, the older engine `B` is not aware of salt and unable to create the same hashed password as engine `A`.	

To circumvent that problem you can either update all engines to the version >= 7.7 or create all users only by the engine of version <= 7.6.

