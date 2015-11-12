---

title: "DMN Decision Table"
weight: 10
layout: "section-list"

menu:
  main:
    name: "Decision Table"
    identifier: "dmn-ref-decision-table"
    parent: "dmn-ref"
    pre: "Specify Decision Logic as a Table"

---

{{< img src="img/dish-table.png" class="no-lightbox" >}}
<script type="text/javascript" src="./js/dish-table.js"></script>

# The Name of the Decision Table

The name is set in the `name` attribute on the `decision` element. It describes the decision which the decision table provides the decision logic.

# The Id of the Decision Table

The id is the technical identifier of the decision table. It is set in the `id` attribute on the `decision` element. 

Each decision table should have an unique id when it is deployed in the Process Engine Repository. The engine use the id as the decision key of the deployed `DecisionDefinition`. Whenever a decision is deployed then the version of the `DecisionDefinition` with the given decision key is increased. Please refer to the [User Guide]({{< relref "user-guide/process-engine/decisions/repository.md#deploying-a-decision" >}}) to read more about deploying a decision table.

