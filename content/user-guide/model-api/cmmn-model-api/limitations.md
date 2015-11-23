---

title: 'Limitations'
weight: 100

menu:
  main:
    identifier: "user-guide-cmmn-model-api-limitations"
    parent: "user-guide-cmmn-model-api"

---

Since the CMMN model API is able to read as well CMMN 1.1 as CMMN 1.0 models, this leads to limitations when editing CMMN models.

* `ModelElementType#getTypeNamespace()` returns CMMN 1.1 namespace for elements which are present in CMMN 1.0 and CMMN 1.1
* `CMMN#createEmptyModel()` creates always a CMMN 1.1 model, so that CMMN 1.0 models cannot be created
* It is not possible to edit an existing CMMN 1.0 model, e.g.:

  1. Read an existing CMMN 1.0 XML
  2. Edit the imported model instance
  3. Write the changes to a file

```java
// 1) read a model from a cmmn 1.0 file
File file = new File("PATH/TO/CMMN/10/MODEL.cmmn");
CmmnModelInstance modelInstance = Cmmn.readModelFromFile(file);

// 2a) add a new human task
HumanTask humanTask = modelInstance.newInstance(HumanTask.class);
casePlanModel.getPlanItemDefinitions().add(humanTask);

// 2b) add a new plan item
PlanItem planItem = modelInstance.newInstance(PlanItem.class);
casePlanModel.getPlanItems().add(planItem);
planItem.setDefinition(humanTask);

// 3) write to file
File anotherFile = new File("PATH/TO/ANOTHER/CMMN/MODEL.cmmn");
Cmmn.writeModelToFile(anotherFile, modelInstance);
```

* CMMN 1.0 attributes and elements cannot be added to a CMMN 1.1 model:

  1. Read an existing CMMN 1.1 XML
  2. Add a CMMN 1.0 attribute and element
  3. Write the changes to a file

```java
// 1) read a model from a cmmn 1.1 file
File file = new File("PATH/TO/CMMN/11/MODEL.cmmn");
CmmnModelInstance modelInstance = Cmmn.readModelFromFile(file);

CasePlanModel casePlan =
    (CasePlanModel) modelInstance.getModelElementById("CASE_PLAN_MODEL_ID");
PlanItem planItem =
    (PlanItem) modelInstance.getModelElementById("PLAN_ITEM_ID");

// 2a) add an entry criterion (to a CMMN 1.0 attribute)
Sentry sentry = modelInstance.newInstance(Sentry.class);
casePlanModel.getSentrys().add(sentry);
planItem.getEntryCriterias().add(sentry);

// 2b) add an (CMMN 1.0) event element
Event event = modelInstance.newInstance(Event.class);
casePlanModel.getPlanItemDefinitions().add(event);

// 3) write to file
File anotherFile = new File("PATH/TO/ANOTHER/CMMN/MODEL.cmmn");
Cmmn.writeModelToFile(anotherFile, modelInstance);
```
