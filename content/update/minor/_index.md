---

title: "Update to the next Minor Version"
weight: 10

menu:
  main:
    name: "Minor Version Update"
    identifier: "migration-guide-minor"
    parent: "migration-guide"
    pre: "Guides you through a minor version update (Example: `7.3` to `7.4`)."

---

These documents guide you through the process of updating your application or server installation from one Camunda minor version to the other.
This applies to any updates of the version number "after the first dot", example: `7.3` to `7.4`.

{{< note title="Do I need to apply every minor version if I missed a few?" class="warning" >}}
Database update scripts are are NOT cumulative. Consult our [database schema update guide]({{< ref "/installation/database-schema.md#update" >}}) for details on how to account for that. Application library updates are cumulative and don't necessarily require sequential minor version updates. You can just apply your target minor application libraries. You should, however, check the migration guide of EVERY intermediate minor version to understand all noteworthy changes in behavior.
{{< /note >}}

There is a dedicated update guide for each version:
