---

title: "Testing Decisions with the DMN Engine"
weight: 50

menu:
  main:
    name: "Testing"
    identifier: "user-guide-dmn-engine-testing"
    parent: "user-guide-dmn-engine"
    pre: "Test Decisions in Unit Tests"

---

To easily test DMN decisions in a JUnit test, the DMN engine provides a
JUnit Rule. The {{< javadocref page="?org/camunda/bpm/dmn/engine/test/DmnEngineRule.html" text="DmnEngineRule" >}} creates a new default DMN engine. The DMN engine can be used in test cases to parse and evaluate decisions.

```java
public class DecisionTest {

  @Rule
  public DmnEngineRule dmnEngineRule = new DmnEngineRule();

  @Test
  public void test() {
    DmnEngine dmnEngine = dmnEngineRule.getDmnEngine();
    // load DMN file
    InputStream inputStream = ...;
    //create and add variables
    VariableMap variables = Variables.createVariables();

    DmnDecision decision = dmnEngine.parseDecision("decision", inputStream);
    DmnDecisionResult result = dmnEngine.evaluateDecision(decision, variables);

    // assert the result
    // ...
  }

}
```

If you want to create a DMN engine with a custom configuration, you can pass
this to the DMN engine rule.


```java
public class DecisionTest {

  @Rule
  public DmnEngineRule dmnEngineRule = new DmnEngineRule(createCustomConfiguration());

  public DmnEngineConfiguration createCustomConfiguration() {
    // create and return custom configuration
    return ...;
  }

  @Test
  public void test() {
    DmnEngine customDmnEngine = dmnEngineRule.getDmnEngine();
    // ...
  }

}
```

The {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionResult.html"
text="DmnDecisionResult" >}} implements the interface
`List<DmnDecisionResultEntries>`. Whereas the {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionResultEntries.html"
text="DmnDecisionResultEntries" >}} implements the interface `Map<String, Object>`. 
This allows you to use common `List` or `Map` asserts.
