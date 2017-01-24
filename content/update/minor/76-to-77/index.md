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
1. For administrators and developers: [Rolling Update](#rolling-update)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.7.

Noteworthy new Features and Changes in 7.7:

* New cryptographic hash function with salt

# Database Updates

Every Camunda installation requires a database schema update.

# Rolling Update

If you do not know what a rolling update in the context of Camunda means, please refer to the [Rolling Update documentation](../../rolling-update/).

In the context of a rolling update, a user created with an engine `A` of Camunda version >= 7.7 cannot be authenticated with an engine `B` of Camunda version <= 7.6. The reason is that the Camunda version 7.7 adds [salt to password hashing](../../../user-guide/process-engine/password-hashing/), thus, the older engine `B` is not aware of salt and unable to create the same hashed password as engine `A`.	

To circumvent that problem you can either update all engines to the version >= 7.7 or create all users only by the engine of version <= 7.6.

